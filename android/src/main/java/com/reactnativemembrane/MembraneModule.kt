package com.reactnativemembrane

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.media.projection.MediaProjectionManager
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.twilio.audioswitch.AudioDevice
import kotlinx.coroutines.Dispatchers
import org.membraneframework.rtc.*
import org.membraneframework.rtc.media.*
import org.membraneframework.rtc.models.Peer
import org.membraneframework.rtc.models.TrackContext
import org.membraneframework.rtc.transport.PhoenixTransport
import org.membraneframework.rtc.utils.Metadata
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

  var isMicrophoneOn = true
  var isCameraOn = true

  private val globalToLocalTrackId = HashMap<String, String>()

  private var connectPromise: Promise? = null
  private var joinPromise: Promise? = null
  private var screencastPromise: Promise? = null

  var videoQuality: String? = null
  var flipVideo: Boolean = true
  var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var videoMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

  private var localUserMetadata: MutableMap<String, Any> = mutableMapOf()

  var screencastQuality: String? = null
  var screencastSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var screencastMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

  var screencastMetadata: MutableMap<String, Any> = mutableMapOf()

  var videoTrackMetadata: MutableMap<String, Any> = mutableMapOf()
  var audioTrackMetadata: MutableMap<String, Any> = mutableMapOf()

  var trackContexts: MutableMap<String, TrackContext> = mutableMapOf()

  var captureDeviceId: String? = null
  val audioSwitchManager = AudioSwitchManager(reactContext)

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

  override fun invalidate() {
    audioSwitchManager.stop()
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
        maxBandwidthSimulcast[it.key] = TrackBandwidthLimit.BandwidthLimit((it.value as Double).toInt())
      }
      TrackBandwidthLimit.SimulcastBandwidthLimit(maxBandwidthSimulcast)
    } else {
      TrackBandwidthLimit.BandwidthLimit(options.getInt("maxBandwidth"))
    }
  }

  private fun getGlobalTrackId(localTrackId: String): String? {
    return globalToLocalTrackId.filterValues { it == localTrackId }.keys.firstOrNull()
  }

  @ReactMethod
  fun connect(url: String, roomName: String, connectionOptions: ReadableMap, promise: Promise) {
    this.videoQuality = connectionOptions.getString("quality")
    if(connectionOptions.hasKey("flipVideo"))
      this.flipVideo = connectionOptions.getBoolean("flipVideo")
    this.localUserMetadata = connectionOptions.getMap("userMetadata")?.toMap() ?: mutableMapOf()
    this.videoTrackMetadata = connectionOptions.getMap("videoTrackMetadata")?.toMap() ?: mutableMapOf()
    this.audioTrackMetadata = connectionOptions.getMap("audioTrackMetadata")?.toMap() ?: mutableMapOf()

    if(connectionOptions.hasKey("videoTrackEnabled"))
      this.isCameraOn = connectionOptions.getBoolean("videoTrackEnabled")
    if(connectionOptions.hasKey("audioTrackEnabled"))
      this.isMicrophoneOn = connectionOptions.getBoolean("audioTrackEnabled")

    val socketConnectionParams = connectionOptions.getMap("connectionParams")?.toMap() ?: mutableMapOf()

    val socketChannelParams = connectionOptions.getMap("socketChannelParams")?.toMap() ?: mutableMapOf()

    this.captureDeviceId = connectionOptions.getString("captureDeviceId")

    this.videoSimulcastConfig = getSimulcastConfigFromOptions(connectionOptions)
    this.videoMaxBandwidth = getMaxBandwidthFromOptions(connectionOptions)

    connectPromise = promise
    room = MembraneRTC.connect(
      appContext = reactApplicationContext,
      options = ConnectOptions(
        transport = PhoenixTransport(url, "room:$roomName", Dispatchers.IO, socketConnectionParams, socketChannelParams),
        config = this.localUserMetadata
      ),
      listener = this@MembraneModule
    )
  }

  private fun ensureConnected(promise: Promise): Boolean {
    if(room == null) {
      promise.reject("E_NOT_CONNECTED", "Client not connected to server yet. Make sure to call connect() first!")
      return false
    }
    return true
  }

  private fun ensureVideoTrack(promise: Promise): Boolean {
    if(localVideoTrack == null) {
      promise.reject("E_NO_LOCAL_VIDEO_TRACK", "No local video track. Make sure to call connect() first!")
      return false
    }
    return true
  }

  private fun ensureAudioTrack(promise: Promise): Boolean {
    if(localAudioTrack == null) {
      promise.reject("E_NO_LOCAL_AUDIO_TRACK", "No local audio track. Make sure to call connect() first!")
      return false
    }
    return true
  }

  private fun ensureScreencastTrack(promise: Promise): Boolean {
    if(localScreencastTrack == null) {
      promise.reject("E_NO_LOCAL_SCREENCAST_TRACK", "No local screencast track. Make sure to toggle screencast on first!")
      return false
    }
    return true
  }

  @ReactMethod
  fun join(promise: Promise) {
    if(!ensureConnected(promise)) return
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
    if(!ensureAudioTrack(promise)) return
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
    if(!ensureVideoTrack(promise)) return
    localVideoTrack?.let {
      val enabled = !it.enabled()
      it.setEnabled(enabled)
      isCameraOn = enabled
      promise.resolve(enabled)
    }
  }

  @ReactMethod
  fun flipCamera(promise: Promise) {
    if(!ensureVideoTrack(promise)) return
    localVideoTrack?.flipCamera()
    promise.resolve(null)
  }

  @ReactMethod
  fun switchCamera(captureDeviceId: String, promise: Promise) {
    if(!ensureVideoTrack(promise)) return
    localVideoTrack?.switchCamera(captureDeviceId)
    promise.resolve(null)
  }

  @ReactMethod
  fun getCaptureDevices(promise: Promise) {
    val devices = LocalVideoTrack.getCaptureDevices(reactApplicationContext)
    val rnArray = Arguments.createArray()
    devices.forEach { device ->
      val rnMap = Arguments.createMap()
      rnMap.putString("id", device.deviceName)
      rnMap.putString("name", device.deviceName)
      rnMap.putBoolean("isFrontFacing", device.isFrontFacing)
      rnMap.putBoolean("isBackFacing", device.isBackFacing)
      rnArray.pushMap(rnMap)
    }
    promise.resolve(rnArray)
  }

  @ReactMethod
  fun toggleScreencast(screencastOptions: ReadableMap, promise: Promise) {
    this.screencastMetadata = screencastOptions.getMap("screencastMetadata")?.toMap() ?: mutableMapOf()
    this.screencastQuality = screencastOptions.getString("quality")
    this.screencastSimulcastConfig = getSimulcastConfigFromOptions(screencastOptions)
    this.screencastMaxBandwidth = getMaxBandwidthFromOptions(screencastOptions)
    screencastPromise = promise
    if(!isScreenCastOn) {
      if(!ensureConnected(promise)) return
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
    if(!ensureConnected(promise)) return
    room?.updatePeerMetadata(metadata.toMap())
    promise.resolve(null)
  }

  private fun updateTrackMetadata(trackId: String, metadata: Metadata) {
    room?.updateTrackMetadata(trackId, metadata)
    val id = localParticipantId ?: return
    val participant = participants[id] ?: return
    participant.tracksMetadata[trackId] = metadata
    emitParticipants()
  }

  @ReactMethod
  fun updateVideoTrackMetadata(metadata: ReadableMap, promise: Promise) {
    if(!ensureVideoTrack(promise)) return
    val trackId = localVideoTrack?.rtcTrack()?.id() ?: return
    updateTrackMetadata(trackId, metadata.toMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun updateAudioTrackMetadata(metadata: ReadableMap, promise: Promise) {
    if(!ensureAudioTrack(promise)) return
    val trackId = localAudioTrack?.rtcTrack()?.id() ?: return
    updateTrackMetadata(trackId, metadata.toMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun updateScreencastTrackMetadata(metadata: ReadableMap, promise: Promise) {
    if(!ensureScreencastTrack(promise)) return
    val trackId = localScreencastTrack?.rtcTrack()?.id() ?: return
    updateTrackMetadata(trackId, metadata.toMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun setOutputAudioDevice(audioDevice: String, promise: Promise) {
    audioSwitchManager.selectAudioOutput(AudioDeviceKind.fromTypeName(audioDevice))
    promise.resolve(null)
  }

  @ReactMethod
  fun startAudioSwitcher(promise: Promise) {
    audioSwitchManager.start(this::emitAudioDeviceEvent)
    emitAudioDeviceEvent(audioSwitchManager.availableAudioDevices(), audioSwitchManager.selectedAudioDevice())
    promise.resolve(null)
  }

  @ReactMethod
  fun stopAudioSwitcher(promise: Promise) {
    audioSwitchManager.stop()
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
    if(!ensureScreencastTrack(promise)) return
    val trackId = localScreencastTrack?.id() ?: return
    screencastSimulcastConfig = toggleTrackEncoding(encoding, trackId, screencastSimulcastConfig)
    promise.resolve(getSimulcastConfigAsRNMap(screencastSimulcastConfig))
  }

  @ReactMethod
  fun setScreencastTrackBandwidth(bandwidth: Int, promise: Promise) {
    if(!ensureScreencastTrack(promise)) return
    val trackId = localScreencastTrack?.id() ?: return
    room?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setScreencastTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    if(!ensureScreencastTrack(promise)) return
    val trackId = localScreencastTrack?.id() ?: return
    room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setTargetTrackEncoding(trackId: String, encoding: String, promise: Promise) {
    if(!ensureConnected(promise)) return
    val globalTrackId = getGlobalTrackId(trackId)
    if(globalTrackId == null) {
      promise.reject("E_INVALID_TRACK_ID", "Remote track with id=${trackId} not found")
      return
    }
    room?.setTargetTrackEncoding(globalTrackId, encoding.toTrackEncoding())
    promise.resolve(null)
  }

  @ReactMethod
  fun toggleVideoTrackEncoding(encoding: String, promise: Promise) {
    if(!ensureVideoTrack(promise)) return
    val trackId = localVideoTrack?.id() ?: return
    videoSimulcastConfig = toggleTrackEncoding(encoding, trackId, videoSimulcastConfig)
    promise.resolve(getSimulcastConfigAsRNMap(videoSimulcastConfig))
  }

  @ReactMethod
  fun setVideoTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    if(!ensureVideoTrack(promise)) return
    val trackId = localVideoTrack?.id() ?: return
    room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
    promise.resolve(null)
  }

  @ReactMethod
  fun setVideoTrackBandwidth(bandwidth: Int, promise: Promise) {
    if(!ensureVideoTrack(promise)) return
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

    localScreencastTrack = room?.createScreencastTrack(mediaProjectionPermission, videoParameters, screencastMetadata)

    localScreencastTrack?.let {
      val participant = participants[localParticipantId]
      participant!!.addOrUpdateTrack(it, screencastMetadata)
      emitParticipants()
    }
    screencastPromise?.resolve(isScreenCastOn)
  }

  fun stopScreencast() {
    isScreenCastOn = false

    localScreencastTrack?.let {
      participants[localParticipantId]?.removeTrack(it)
      room?.removeTrack(it.id())
      emitParticipants()
      localScreencastTrack = null
    }
    emitParticipants()
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
          localParticipantId -> "Local"
          else -> "Remote"
      }
      participantMap.putString("type", participantType)
      participantMap.putMap("metadata", mapToRNMap(it.metadata))

      val tracksArray = Arguments.createArray()

      it.videoTracks.values.forEach { videoTrack ->
        val track = Arguments.createMap()
        track.putString("id", videoTrack.id())
        track.putString("type", "Video")
        track.putMap("metadata", mapToRNMap(it.tracksMetadata[videoTrack.id()] ?: emptyMap()))
        track.putString("encoding", trackContexts[videoTrack.id()]?.encoding?.rid)
        track.putString("encodingReason", trackContexts[videoTrack.id()]?.encodingReason?.value)
        tracksArray.pushMap(track)
      }

      it.audioTracks.values.forEach { audioTrack ->
        val track = Arguments.createMap()
        track.putString("id", audioTrack.id())
        track.putString("type", "Audio")
        track.putMap("metadata", mapToRNMap(it.tracksMetadata[audioTrack.id()] ?: emptyMap()))
        track.putString("vadStatus", trackContexts[audioTrack.id()]?.vadStatus?.value)
        tracksArray.pushMap(track)
      }

      participantMap.putArray("tracks", tracksArray)

      participantsArray.pushMap(participantMap)
    }
    params.putArray("participants", participantsArray)
    return params
  }

  private fun emitParticipants() {
    emitEvent("ParticipantsUpdate", getParticipantsAsRNMap())
  }

  private fun audioDeviceAsRNMap(audioDevice: AudioDevice): WritableMap {
    val map = Arguments.createMap()
    map.putString("name", audioDevice.name)
    map.putString("type", AudioDeviceKind.fromAudioDevice(audioDevice)?.typeName)
    return map
  }

  private fun emitAudioDeviceEvent(audioDevices: List<AudioDevice>, selectedDevice: AudioDevice?) {
    val map = Arguments.createMap()
    map.putMap("selectedDevice",  if (selectedDevice != null) audioDeviceAsRNMap(selectedDevice) else null)
    val audioDevicesRNArray = Arguments.createArray()
    audioDevices.forEach { audioDevice -> audioDevicesRNArray.pushMap(audioDeviceAsRNMap(audioDevice)) }
    map.putArray("availableDevices", audioDevicesRNArray)
    emitEvent("AudioDeviceUpdate", map)
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
      localAudioTrack?.setEnabled(isMicrophoneOn)

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

      localVideoTrack = it.createVideoTrack(videoParameters, videoTrackMetadata, captureDeviceId)
      localVideoTrack?.setEnabled(isCameraOn)

      isCameraOn = localVideoTrack?.enabled() ?: false
      isMicrophoneOn = localAudioTrack?.enabled() ?: false

      emitEvent("IsCameraOn", isCameraOn)
      emitEvent("IsMicrophoneOn", isMicrophoneOn)

      localParticipantId = UUID.randomUUID().toString()
      var participant = Participant(
        id = localParticipantId!!,
        metadata = localUserMetadata,
      )
      if(localVideoTrack != null) {
        participant.addOrUpdateTrack(localVideoTrack!!, videoTrackMetadata)
      }
      if(localAudioTrack != null) {
        participant.addOrUpdateTrack(localAudioTrack!!, audioTrackMetadata)
      }
      participants[localParticipantId!!] = participant

      connectPromise?.resolve(null)
      connectPromise = null
      emitParticipants()
    }
  }

  override fun onJoinSuccess(peerID: String, peersInRoom: List<Peer>) {
    participants.remove(peerID)
    peersInRoom.forEach {
      participants[it.id] = Participant(it.id, it.metadata)
    }
    joinPromise?.resolve(null)
    joinPromise = null
    emitParticipants()
  }

  override fun onJoinError(metadata: Any) {
    joinPromise?.reject("E_JOIN_ERROR", metadata.toString())
    joinPromise = null
  }

  private fun addOrUpdateTrack(ctx: TrackContext) {
    val participant = participants[ctx.peer.id] ?: throw IllegalArgumentException("participant with id ${ctx.peer.id} not found")

    when (ctx.track) {
      is RemoteVideoTrack -> {
        val localTrackId = (ctx.track as RemoteVideoTrack).id()
        globalToLocalTrackId[ctx.trackId] = localTrackId
        participant.addOrUpdateTrack(ctx.track as RemoteVideoTrack, ctx.metadata)
        if(trackContexts[localTrackId] == null) {
          trackContexts[localTrackId] = ctx
          ctx.setOnEncodingChangedListener {
            emitParticipants()
          }
        }
      }
      is RemoteAudioTrack -> {
        val localTrackId = (ctx.track as RemoteAudioTrack).id()
        globalToLocalTrackId[ctx.trackId] = localTrackId
        participant.addOrUpdateTrack(ctx.track as RemoteAudioTrack, ctx.metadata)
        if(trackContexts[localTrackId] == null) {
          trackContexts[localTrackId] = ctx
          ctx.setOnVoiceActivityChangedListener {
            emitParticipants()
          }
        }
      }
      else ->
        throw IllegalArgumentException("invalid type of incoming remote track")
    }

    emitParticipants()
    onTracksUpdate?.let { it1 -> it1() }
  }

  override fun onTrackReady(ctx: TrackContext) {
    addOrUpdateTrack(ctx)
  }

  override fun onTrackAdded(ctx: TrackContext) {
  }

  override fun onTrackRemoved(ctx: TrackContext) {
    val participant = participants[ctx.peer.id] ?: throw IllegalArgumentException("participant with id ${ctx.peer.id} not found")

    when (ctx.track) {
      is RemoteVideoTrack -> participant.removeTrack(ctx.track as RemoteVideoTrack)
      is RemoteAudioTrack -> participant.removeTrack(ctx.track as RemoteAudioTrack)
      else -> throw IllegalArgumentException("invalid type of incoming remote track")
    }

    globalToLocalTrackId.remove(ctx.trackId)
    ctx.setOnEncodingChangedListener(null)
    ctx.setOnVoiceActivityChangedListener(null)
    trackContexts.remove(ctx.trackId)
    emitParticipants()
    onTracksUpdate?.let { it1 -> it1() }
  }

  override fun onTrackUpdated(ctx: TrackContext) {
    addOrUpdateTrack(ctx)
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

  override fun onBandwidthEstimationChanged(estimation: Long) {
    emitEvent("BandwidthEstimation", estimation.toFloat())
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
