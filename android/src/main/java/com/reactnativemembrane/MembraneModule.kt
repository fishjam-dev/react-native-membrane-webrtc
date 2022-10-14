package com.reactnativemembrane

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.media.projection.MediaProjectionManager
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlinx.coroutines.Dispatchers
import org.membraneframework.rtc.*
import org.membraneframework.rtc.media.*
import org.membraneframework.rtc.models.Peer
import org.membraneframework.rtc.models.TrackContext
import org.membraneframework.rtc.transport.PhoenixTransport
import java.util.*


class MembraneModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext),
  MembraneRTCListener {
  private val SCREENCAST_REQUEST = 1
  private var room: MembraneRTC? = null

  var localAudioTrack: LocalAudioTrack? = null
  var localVideoTrack: LocalVideoTrack? = null
  var localScreencastTrack: LocalScreencastTrack? = null
  var localParticipantId: String? = null

  var isScreenCastOn = false
  private var localScreencastId: String? = null

  var isMicrophoneOn = false
  var isCameraOn = false

  private val globalToLocalTrackId = HashMap<String, String>()

  private var connectPromise: Promise? = null
  private var joinPromise: Promise? = null
  private var screencastPromise: Promise? = null

  var videoQuality: String? = null
  var flipVideo: Boolean = true
  var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var videoMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

  private var localUserMetadata: MutableMap<String, String> = mutableMapOf()

  var screencastQuality: String? = null
  var screencastSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var screencastMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

  var screencastMetadata: MutableMap<String, String> = mutableMapOf()

  var videoTrackMetadata: MutableMap<String, String> = mutableMapOf()
  var audioTrackMetadata: MutableMap<String, String> = mutableMapOf()


  companion object {
    val participants = LinkedHashMap<String, Participant>()
    var onTracksUpdate: (() -> Unit)? = null
  }

  override fun getName(): String {
    return "Membrane"
  }

  private val activityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(
      activity: Activity?,
      requestCode: Int,
      resultCode: Int,
      data: Intent?
    ) {
      if(requestCode != SCREENCAST_REQUEST) return
      if (resultCode != Activity.RESULT_OK) {
        screencastPromise?.resolve(false)
        screencastPromise = null
        return
      }

      data?.let {
        startScreencast(it)
      }
    }
  }

  init {
    reactContext.addActivityEventListener(activityEventListener)
  }

  private fun ReadableMap.toMetadata(): MutableMap<String, String> {
    val res = mutableMapOf<String, String>()
    this.entryIterator.forEach {
      res[it.key] = it.value as String
    }
    return res
  }

  private fun String.toTrackEncoding(): TrackEncoding {
    return when(this) {
      "l" -> TrackEncoding.L
      "m" -> TrackEncoding.M
      "h" -> TrackEncoding.H
      else -> throw Error("Invalid encoding specified: $this")
    }
  }

  private fun getSimulcastConfigFromOptions(options: ReadableMap): SimulcastConfig {
    val simulcastConfigMap = options.getMap("simulcastConfig")
    val simulcastEnabled = simulcastConfigMap?.getBoolean("enabled") ?: false
    val activeEncodings = simulcastConfigMap?.getArray("activeEncodings")?.toArrayList()?.map { e ->  (e as String).toTrackEncoding() } ?: emptyList()
    return SimulcastConfig(
      enabled = simulcastEnabled,
      activeEncodings = activeEncodings
    )
  }

  private fun getMaxBandwidthFromOptions(options: ReadableMap): TrackBandwidthLimit {
    return if(!options.hasKey("maxBandwidth")) {
      TrackBandwidthLimit.BandwidthLimit(0)
    } else if(options.getMap("maxBandwidth") != null) {
      val maxBandwidthSimulcast = mutableMapOf<String, TrackBandwidthLimit.BandwidthLimit>()
      options.getMap("maxBandwidth")?.entryIterator?.forEach {
        maxBandwidthSimulcast[it.key] = it.value as TrackBandwidthLimit.BandwidthLimit
      }
      TrackBandwidthLimit.SimulcastBandwidthLimit(maxBandwidthSimulcast)
    } else {
      TrackBandwidthLimit.BandwidthLimit(options.getInt("maxBandwidth"))
    }
  }

  private fun getGlobalTrackId(localTrackId: String): String {
    return globalToLocalTrackId.filterValues { it == localTrackId }.keys.first()
  }

  @ReactMethod
  fun connect(url: String, roomName: String, connectionOptions: ReadableMap, promise: Promise) {
    this.videoQuality = connectionOptions.getString("quality")
    if(connectionOptions.hasKey("flipVideo"))
      this.flipVideo = connectionOptions.getBoolean("flipVideo")
    this.localUserMetadata = connectionOptions.getMap("userMetadata")?.toMetadata() ?: mutableMapOf()
    this.videoTrackMetadata = connectionOptions.getMap("videoTrackMetadata")?.toMetadata() ?: mutableMapOf()
    this.audioTrackMetadata = connectionOptions.getMap("audioTrackMetadata")?.toMetadata() ?: mutableMapOf()

    val socketConnectionParams = connectionOptions.getMap("connectionParams")?.toMetadata() ?: mutableMapOf()
    this.videoSimulcastConfig = getSimulcastConfigFromOptions(connectionOptions)
    this.videoMaxBandwidth = getMaxBandwidthFromOptions(connectionOptions)

    val audioManager =  reactApplicationContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    audioManager.isSpeakerphoneOn = true

    connectPromise = promise
    room = MembraneRTC.connect(
      appContext = reactApplicationContext,
      options = ConnectOptions(
        transport = PhoenixTransport(url, "room:$roomName", Dispatchers.IO, socketConnectionParams),
        config = this.localUserMetadata
      ),
      listener = this@MembraneModule
    )
  }

  @ReactMethod
  fun join(promise: Promise) {
    joinPromise = promise
    room?.join()
  }

  @ReactMethod
  fun disconnect(promise: Promise) {
    room?.disconnect()
    room = null
    participants.clear();
    promise.resolve(null)
  }

  @ReactMethod
  fun isMicrophoneOn(promise: Promise) {
    promise.resolve(isMicrophoneOn)
  }

  @ReactMethod
  fun toggleMicrophone(promise: Promise) {
    localAudioTrack?.let {
      val enabled = !it.enabled()
      it.setEnabled(enabled)
      isMicrophoneOn = enabled
      promise.resolve(enabled)
    }
  }

  @ReactMethod
  fun isCameraOn(promise: Promise) {
    promise.resolve(isCameraOn)
  }

  @ReactMethod
  fun toggleCamera(promise: Promise) {
    localVideoTrack?.let {
      val enabled = !it.enabled()
      it.setEnabled(enabled)
      isCameraOn = enabled
      promise.resolve(enabled)
    }
  }

  @ReactMethod
  fun flipCamera(promise: Promise) {
    localVideoTrack?.flipCamera()
    promise.resolve(null)
  }

  @ReactMethod
  fun toggleScreencast(screencastOptions: ReadableMap, promise: Promise) {
    this.screencastMetadata = screencastOptions.getMap("screencastMetadata")?.toMetadata() ?: mutableMapOf()
    this.screencastMetadata["type"] = "screensharing"
    this.screencastQuality = screencastOptions.getString("quality")
    this.screencastSimulcastConfig = getSimulcastConfigFromOptions(screencastOptions)
    this.screencastMaxBandwidth = getMaxBandwidthFromOptions(screencastOptions)
    screencastPromise = promise
    if(!isScreenCastOn) {
      val currentActivity = currentActivity
      if (currentActivity == null) {
        promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist")
        return
      }

      val mediaProjectionManager =
        reactApplicationContext.getSystemService(AppCompatActivity.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
      val intent = mediaProjectionManager.createScreenCaptureIntent()
      currentActivity.startActivityForResult(intent, SCREENCAST_REQUEST)
    } else {
      stopScreencast()
    }
  }

  @ReactMethod
  fun getParticipants(promise: Promise) {
    promise.resolve(getParticipantsAsRNMap())
  }

  @ReactMethod
  fun updatePeerMetadata(metadata: ReadableMap, promise: Promise) {
    room?.updatePeerMetadata(metadata.toMetadata())
    promise.resolve(null)
  }

  @ReactMethod
  fun updateVideoTrackMetadata(metadata: ReadableMap, promise: Promise) {
    val trackId = localVideoTrack?.rtcTrack()?.id() ?: return
    room?.updateTrackMetadata(trackId, metadata.toMetadata())
    promise.resolve(null)
  }

  @ReactMethod
  fun updateAudioTrackMetadata(metadata: ReadableMap, promise: Promise) {
    val trackId = localAudioTrack?.rtcTrack()?.id() ?: return
    room?.updateTrackMetadata(trackId, metadata.toMetadata())
    promise.resolve(null)
  }

  @ReactMethod
  fun updateScreencastTrackMetadata(metadata: ReadableMap, promise: Promise) {
    val trackId = localScreencastTrack?.rtcTrack()?.id() ?: return
    room?.updateTrackMetadata(trackId, metadata.toMetadata())
    promise.resolve(null)
  }

  @ReactMethod
  fun toggleSpeakerphone(promise: Promise) {
    val audioManager =  reactApplicationContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    audioManager.isSpeakerphoneOn = !audioManager.isSpeakerphoneOn
    promise.resolve(null)
  }

  private fun toggleTrackEncoding(encoding: String, trackId: String, simulcastConfig: SimulcastConfig): SimulcastConfig {
    val trackEncoding = encoding.toTrackEncoding()
    if(simulcastConfig.activeEncodings.contains(trackEncoding)) {
      room?.disableTrackEncoding(trackId, trackEncoding)
      return SimulcastConfig(
        enabled = true,
        activeEncodings = simulcastConfig.activeEncodings.filter { e -> e != trackEncoding }
      )
    } else {
      room?.enableTrackEncoding(trackId, trackEncoding)
      return SimulcastConfig(
        enabled = true,
        activeEncodings = simulcastConfig.activeEncodings + listOf(trackEncoding)
      )
    }
  }

  @ReactMethod
  fun toggleScreencastTrackEncoding(encoding: String, promise: Promise) {
    val trackId = localScreencastTrack?.id() ?: return
    screencastSimulcastConfig = toggleTrackEncoding(encoding, trackId, screencastSimulcastConfig)
    promise.resolve(getSimulcastConfigAsRNMap(screencastSimulcastConfig))
  }

  @ReactMethod
  fun setScreencastTrackBandwidth(bandwidth: Int, promise: Promise) {
    val trackId = localScreencastTrack?.id() ?: return
    room?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setScreencastTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    val trackId = localScreencastTrack?.id() ?: return
    room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setTargetTrackEncoding(peerId: String, encoding: String, promise: Promise) {
    val trackId = participants.get(peerId)?.videoTrack?.id()?.let { getGlobalTrackId(it) } ?: return
    room?.setTargetTrackEncoding(trackId, encoding.toTrackEncoding())
    promise.resolve(null)
  }

  @ReactMethod
  fun toggleVideoTrackEncoding(encoding: String, promise: Promise) {
    val trackId = localVideoTrack?.id() ?: return
    videoSimulcastConfig = toggleTrackEncoding(encoding, trackId, videoSimulcastConfig)
    promise.resolve(getSimulcastConfigAsRNMap(videoSimulcastConfig))
  }

  @ReactMethod
  fun setVideoTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    val trackId = localVideoTrack?.id() ?: return
    room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setVideoTrackBandwidth(bandwidth: Int, promise: Promise) {
    val trackId = localVideoTrack?.id() ?: return
    room?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun addListener(eventName: String?) {}

  @ReactMethod
  fun removeListeners(count: Int?) {}

  fun startScreencast(mediaProjectionPermission: Intent) {
    if (localScreencastTrack != null) return

    isScreenCastOn = true

    localScreencastId = UUID.randomUUID().toString()

    var videoParameters = when(screencastQuality) {
      "VGA" -> VideoParameters.presetScreenShareVGA
      "HD5" -> VideoParameters.presetScreenShareHD5
      "HD15" -> VideoParameters.presetScreenShareHD15
      "FHD15" -> VideoParameters.presetScreenShareFHD15
      "FHD30" -> VideoParameters.presetScreenShareFHD30
      else -> VideoParameters.presetScreenShareHD15
    }
    val dimensions = videoParameters.dimensions.flip()
    videoParameters = videoParameters.copy(
      dimensions = dimensions,
      simulcastConfig = screencastSimulcastConfig,
      maxBitrate = screencastMaxBandwidth,
    )

    localScreencastTrack = room?.createScreencastTrack(mediaProjectionPermission, videoParameters, screencastMetadata) {
      stopScreencast()
    }

    localScreencastTrack?.let {
      participants[localScreencastId!!] = Participant(id = localScreencastId!!, metadata = screencastMetadata, videoTrack = it)
      emitParticipants()
    }
    screencastPromise?.resolve(isScreenCastOn)
  }

  fun stopScreencast() {
    isScreenCastOn = false

    localScreencastTrack?.let {
      room?.removeTrack(it.id())

      localScreencastId?.let {
        participants.remove(it)

        emitParticipants()
      }

      localScreencastTrack = null
    }
    screencastPromise?.resolve(isScreenCastOn)
    screencastPromise = null
  }

  private fun emitEvent(eventName: String, data: Any?) {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, data)
  }

  private fun getParticipantsAsRNMap(): WritableMap? {
    val params = Arguments.createMap()
    val participantsArray = Arguments.createArray();
    participants.values.forEach {
      val participantMap = Arguments.createMap()
      participantMap.putString("id", it.id)
      val participantType = when (it.id) {
          localScreencastId -> "LocalScreencasting"
          localParticipantId -> "Local"
          else -> "Remote"
      }
      participantMap.putString("type", participantType)
      val metadataMap = Arguments.createMap()
      it.metadata.forEach { e -> metadataMap.putString(e.key, e.value)}
      participantMap.putMap("metadata", metadataMap)
      participantsArray.pushMap(participantMap)
    }
    params.putArray("participants", participantsArray)
    return params
  }

  private fun emitParticipants() {
    emitEvent("ParticipantsUpdate", getParticipantsAsRNMap())
  }

  private fun getSimulcastConfigAsRNMap(simulcastConfig: SimulcastConfig): WritableMap? {
    val map = Arguments.createMap()
    val activeEncodings = Arguments.createArray()
    simulcastConfig.activeEncodings.forEach {
      activeEncodings.pushString(it.rid)
    }
    map.putBoolean("enabled", simulcastConfig.enabled)
    map.putArray("activeEncodings", activeEncodings)
    return map
  }

  override fun onConnected() {
    room?.let {
      localAudioTrack = it.createAudioTrack(audioTrackMetadata)

      var videoParameters = when (videoQuality) {
        "QVGA169" -> VideoParameters.presetQVGA169
        "VGA169" -> VideoParameters.presetVGA169
        "QHD169" -> VideoParameters.presetQHD169
        "HD169" -> VideoParameters.presetHD169
        "FHD169" -> VideoParameters.presetFHD169
        "QVGA43" -> VideoParameters.presetQVGA43
        "VGA43" -> VideoParameters.presetVGA43
        "QHD43" -> VideoParameters.presetQHD43
        "HD43" -> VideoParameters.presetHD43
        "FHD43" -> VideoParameters.presetFHD43
        else -> VideoParameters.presetVGA169
      }
      videoParameters = videoParameters.copy(
        dimensions = if (flipVideo) videoParameters.dimensions.flip() else videoParameters.dimensions,
        simulcastConfig = videoSimulcastConfig,
        maxBitrate = videoMaxBandwidth
      )

      localVideoTrack = it.createVideoTrack(videoParameters, videoTrackMetadata)

      isCameraOn = localVideoTrack?.enabled() ?: false
      isMicrophoneOn = localAudioTrack?.enabled() ?: false

      emitEvent("IsCameraOn", isCameraOn)
      emitEvent("IsMicrophoneOn", isMicrophoneOn)

      localParticipantId = UUID.randomUUID().toString()
      participants[localParticipantId!!] =
        Participant(localParticipantId!!, localUserMetadata, localVideoTrack, localAudioTrack)
      connectPromise?.resolve(null)
      connectPromise = null
      emitParticipants()
    }
  }

  override fun onJoinSuccess(peerID: String, peersInRoom: List<Peer>) {
    participants.remove(peerID)
    peersInRoom.forEach {
      participants[it.id] =
        Participant(it.id, it.metadata, null, null)
    }
    joinPromise?.resolve(null)
    joinPromise = null
    emitParticipants()
  }

  override fun onJoinError(metadata: Any) {
    joinPromise?.reject("E_JOIN_ERROR", metadata.toString())
    joinPromise = null
  }

  override fun onTrackReady(ctx: TrackContext) {
    val participant = participants[ctx.peer.id] ?: return

    val (id, newParticipant) = when (ctx.track) {
      is RemoteVideoTrack -> {
        globalToLocalTrackId[ctx.trackId] = (ctx.track as RemoteVideoTrack).id()

        if (ctx.metadata["type"] == "screensharing") {
          Pair(
            ctx.trackId,
            participant.copy(
              id = ctx.trackId,
              metadata = ctx.metadata,
              videoTrack = ctx.track as RemoteVideoTrack
            )
          )
        } else {
          Pair(ctx.peer.id, participant.copy(videoTrack = ctx.track as RemoteVideoTrack))
        }
      }
      is RemoteAudioTrack -> {
        globalToLocalTrackId[ctx.trackId] = (ctx.track as RemoteAudioTrack).id()

        Pair(ctx.peer.id, participant.copy(audioTrack = ctx.track as RemoteAudioTrack))
      }
      else ->
        throw IllegalArgumentException("invalid type of incoming remote track")
    }

    participants[id] = newParticipant

    emitParticipants()
    onTracksUpdate?.let { it1 -> it1() }
  }

  override fun onTrackAdded(ctx: TrackContext) {
  }

  override fun onTrackRemoved(ctx: TrackContext) {
    if (ctx.metadata["type"] == "screensharing") {
      // screencast is a throw-away type of participant so remove it and emit participants once again
      participants.remove(ctx.trackId)
      globalToLocalTrackId.remove(ctx.trackId)

      emitParticipants()
    } else {
      val participant = participants[ctx.peer.id] ?: return

      val localTrackId = globalToLocalTrackId[ctx.trackId]
      val audioTrackId = participant.audioTrack?.id()
      val videoTrackId = participant.videoTrack?.id()

      val newParticipant = when {
        localTrackId == videoTrackId ->
          participant.copy(videoTrack = null)

        localTrackId == audioTrackId ->
          participant.copy(audioTrack = null)

        else ->
          throw IllegalArgumentException("track has not been found for given peer")
      }

      globalToLocalTrackId.remove(ctx.trackId)

      participants[ctx.peer.id] = newParticipant

      emitParticipants()
      onTracksUpdate?.let { it1 -> it1() }
    }
  }

  override fun onTrackUpdated(ctx: TrackContext) {
  }

  override fun onPeerJoined(peer: Peer) {
    participants[peer.id] =
      Participant(id = peer.id, metadata = peer.metadata)
    emitParticipants()
  }

  override fun onPeerLeft(peer: Peer) {
    participants.remove(peer.id)
    emitParticipants()
  }

  override fun onPeerUpdated(peer: Peer) {
  }

  override fun onError(error: MembraneRTCError) {
    when {
        connectPromise != null -> {
          connectPromise?.reject("E_MEMBRANE_ERROR", error.toString())
          connectPromise = null
        }
        joinPromise != null -> {
          joinPromise?.reject("E_MEMBRANE_ERROR", error.toString())
          joinPromise = null
        }
    }
    emitEvent("MembraneError", error.toString())
  }
}
