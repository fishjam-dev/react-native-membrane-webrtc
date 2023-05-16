package com.reactnativemembrane

import android.app.Activity
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.twilio.audioswitch.AudioDevice
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.membraneframework.rtc.MembraneRTC
import org.membraneframework.rtc.MembraneRTCListener
import org.membraneframework.rtc.SimulcastConfig
import org.membraneframework.rtc.media.*
import org.membraneframework.rtc.models.Peer
import org.membraneframework.rtc.models.TrackContext
import org.membraneframework.rtc.utils.Metadata
import org.membraneframework.rtc.utils.SerializedMediaEvent
import org.webrtc.Logging
import java.util.UUID


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

  private var joinPromise: Promise? = null
  private var screencastPromise: Promise? = null

  var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()

  private var localUserMetadata: MutableMap<String, Any> = mutableMapOf()

  var screencastQuality: String? = null
  var screencastSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var screencastMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

  var screencastMetadata: MutableMap<String, Any> = mutableMapOf()

  var trackContexts: MutableMap<String, TrackContext> = mutableMapOf()

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
      if (requestCode != SCREENCAST_REQUEST) return
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
    val activeEncodings = simulcastConfigMap?.getArray("activeEncodings")?.toArrayList()
      ?.map { e -> (e as String).toTrackEncoding() } ?: emptyList()
    return SimulcastConfig(
      enabled = simulcastEnabled,
      activeEncodings = activeEncodings
    )
  }

  private fun getMaxBandwidthFromOptions(options: ReadableMap): TrackBandwidthLimit {
    return if (!options.hasKey("maxBandwidth")) {
      TrackBandwidthLimit.BandwidthLimit(0)
    } else if (options.getMap("maxBandwidth") != null) {
      val maxBandwidthSimulcast = mutableMapOf<String, TrackBandwidthLimit.BandwidthLimit>()
      options.getMap("maxBandwidth")?.entryIterator?.forEach {
        maxBandwidthSimulcast[it.key] =
          TrackBandwidthLimit.BandwidthLimit((it.value as Double).toInt())
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
  fun create(url: String, createOptions: ReadableMap, promise: Promise) {
    val videoTrackMetadata = createOptions.getMap("videoTrackMetadata")?.toMap() ?: mutableMapOf()
    val audioTrackMetadata = createOptions.getMap("audioTrackMetadata")?.toMap() ?: mutableMapOf()

    if (createOptions.hasKey("videoTrackEnabled"))
      this.isCameraOn = createOptions.getBoolean("videoTrackEnabled")
    if (createOptions.hasKey("audioTrackEnabled"))
      this.isMicrophoneOn = createOptions.getBoolean("audioTrackEnabled")

    val captureDeviceId = createOptions.getString("captureDeviceId")

    this.videoSimulcastConfig = getSimulcastConfigFromOptions(createOptions)

    val room = MembraneRTC.create(
      appContext = reactApplicationContext,
      listener = this@MembraneModule
    )
    this.room = room

    localAudioTrack = room.createAudioTrack(audioTrackMetadata)
    localAudioTrack?.setEnabled(isMicrophoneOn)

    val videoParameters = getVideoParametersFromOptions(createOptions)

    localVideoTrack = room.createVideoTrack(videoParameters, videoTrackMetadata, captureDeviceId)
    localVideoTrack?.setEnabled(isCameraOn)

    isCameraOn = localVideoTrack?.enabled() ?: false
    isMicrophoneOn = localAudioTrack?.enabled() ?: false

    emitEvent("IsCameraOn", isCameraOn)
    emitEvent("IsMicrophoneOn", isMicrophoneOn)

    localParticipantId = UUID.randomUUID().toString()
    val participant = Participant(
      id = localParticipantId!!,
      metadata = localUserMetadata,
    )
    if (localVideoTrack != null) {
      participant.addOrUpdateTrack(localVideoTrack!!, videoTrackMetadata)
    }
    if (localAudioTrack != null) {
      participant.addOrUpdateTrack(localAudioTrack!!, audioTrackMetadata)
    }
    participants[localParticipantId!!] = participant

    emitParticipants()
    promise.resolve(null)
  }

  private fun getVideoParametersFromOptions(createOptions: ReadableMap): VideoParameters {
    val videoQuality = createOptions.getString("quality")
    val flipVideo = if (createOptions.hasKey("flipVideo")) createOptions.getBoolean("flipVideo") else true
    val videoMaxBandwidth = getMaxBandwidthFromOptions(createOptions)

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

    return videoParameters
  }

  private fun ensureConnected(promise: Promise): Boolean {
    if (room == null) {
      promise.reject(
        "E_NOT_CONNECTED",
        "Client not connected to server yet. Make sure to call connect() first!"
      )
      return false
    }
    return true
  }

  private fun ensureVideoTrack(promise: Promise): Boolean {
    if (localVideoTrack == null) {
      promise.reject(
        "E_NO_LOCAL_VIDEO_TRACK",
        "No local video track. Make sure to call connect() first!"
      )
      return false
    }
    return true
  }

  private fun ensureAudioTrack(promise: Promise): Boolean {
    if (localAudioTrack == null) {
      promise.reject(
        "E_NO_LOCAL_AUDIO_TRACK",
        "No local audio track. Make sure to call connect() first!"
      )
      return false
    }
    return true
  }

  private fun ensureScreencastTrack(promise: Promise): Boolean {
    if (localScreencastTrack == null) {
      promise.reject(
        "E_NO_LOCAL_SCREENCAST_TRACK",
        "No local screencast track. Make sure to toggle screencast on first!"
      )
      return false
    }
    return true
  }

  @ReactMethod
  fun receiveMediaEvent(data: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureConnected(promise)) return@launch
      room?.receiveMediaEvent(data)
    }
  }

  @ReactMethod
  fun join(peerMetadata: ReadableMap, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureConnected(promise)) return@launch
      joinPromise = promise
      localUserMetadata = peerMetadata.toMap()
      val id = localParticipantId ?: return@launch
      val participant = participants[id] ?: return@launch
      participants[id] = participant.copy(metadata = localUserMetadata)
      room?.join(localUserMetadata)
    }
  }

  @ReactMethod
  fun disconnect(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      room?.disconnect()
      room = null
      participants.clear()
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun isMicrophoneOn(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      promise.resolve(isMicrophoneOn)
    }
  }

  @ReactMethod
  fun toggleMicrophone(promise: Promise) {
    if (!ensureAudioTrack(promise)) return
    localAudioTrack?.let {
      val enabled = !it.enabled()
      it.setEnabled(enabled)
      isMicrophoneOn = enabled
      promise.resolve(enabled)
    }
  }

  @ReactMethod
  fun isCameraOn(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      promise.resolve(isCameraOn)
    }
  }

  @ReactMethod
  fun toggleCamera(promise: Promise) {
    if (!ensureVideoTrack(promise)) return
    localVideoTrack?.let {
      val enabled = !it.enabled()
      it.setEnabled(enabled)
      isCameraOn = enabled
      promise.resolve(enabled)
    }
  }

  @ReactMethod
  fun flipCamera(promise: Promise) {
    if (!ensureVideoTrack(promise)) return
    localVideoTrack?.flipCamera()
    promise.resolve(null)
  }

  @ReactMethod
  fun switchCamera(captureDeviceId: String, promise: Promise) {
    if (!ensureVideoTrack(promise)) return
    localVideoTrack?.switchCamera(captureDeviceId)
    promise.resolve(null)
  }

  @ReactMethod
  fun getCaptureDevices(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
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
  }

  @ReactMethod
  fun toggleScreencast(screencastOptions: ReadableMap, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      this@MembraneModule.screencastMetadata =
        screencastOptions.getMap("screencastMetadata")?.toMap() ?: mutableMapOf()
      this@MembraneModule.screencastQuality = screencastOptions.getString("quality")
      this@MembraneModule.screencastSimulcastConfig =
        getSimulcastConfigFromOptions(screencastOptions)
      this@MembraneModule.screencastMaxBandwidth = getMaxBandwidthFromOptions(screencastOptions)
      screencastPromise = promise
      if (!isScreenCastOn) {
        if (!ensureConnected(promise)) return@launch
        val currentActivity = currentActivity
        if (currentActivity == null) {
          promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist")
          return@launch
        }

        val mediaProjectionManager =
          reactApplicationContext.getSystemService(AppCompatActivity.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
        val intent = mediaProjectionManager.createScreenCaptureIntent()
        currentActivity.startActivityForResult(intent, SCREENCAST_REQUEST)
      } else {
        stopScreencast()
      }
    }
  }

  @ReactMethod
  fun getParticipants(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      promise.resolve(getParticipantsAsRNMap())
    }
  }

  @ReactMethod
  fun updatePeerMetadata(metadata: ReadableMap, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureConnected(promise)) return@launch
      room?.updatePeerMetadata(metadata.toMap())
      promise.resolve(null)
    }
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
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureVideoTrack(promise)) return@launch
      val trackId = localVideoTrack?.rtcTrack()?.id() ?: return@launch
      updateTrackMetadata(trackId, metadata.toMap())
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun updateAudioTrackMetadata(metadata: ReadableMap, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureAudioTrack(promise)) return@launch
      val trackId = localAudioTrack?.rtcTrack()?.id() ?: return@launch
      updateTrackMetadata(trackId, metadata.toMap())
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun updateScreencastTrackMetadata(metadata: ReadableMap, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureScreencastTrack(promise)) return@launch
      val trackId = localScreencastTrack?.rtcTrack()?.id() ?: return@launch
      updateTrackMetadata(trackId, metadata.toMap())
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun setOutputAudioDevice(audioDevice: String, promise: Promise) {
    audioSwitchManager.selectAudioOutput(AudioDeviceKind.fromTypeName(audioDevice))
    promise.resolve(null)
  }

  @ReactMethod
  fun startAudioSwitcher(promise: Promise) {
    audioSwitchManager.start(this::emitAudioDeviceEvent)
    emitAudioDeviceEvent(
      audioSwitchManager.availableAudioDevices(),
      audioSwitchManager.selectedAudioDevice()
    )
    promise.resolve(null)
  }

  @ReactMethod
  fun stopAudioSwitcher(promise: Promise) {
    audioSwitchManager.stop()
    promise.resolve(null)
  }

  private fun toggleTrackEncoding(
    encoding: String,
    trackId: String,
    simulcastConfig: SimulcastConfig
  ): SimulcastConfig {
    val trackEncoding = encoding.toTrackEncoding()
    if (simulcastConfig.activeEncodings.contains(trackEncoding)) {
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
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureScreencastTrack(promise)) return@launch
      val trackId = localScreencastTrack?.id() ?: return@launch
      screencastSimulcastConfig = toggleTrackEncoding(encoding, trackId, screencastSimulcastConfig)
      promise.resolve(getSimulcastConfigAsRNMap(screencastSimulcastConfig))
    }
  }

  @ReactMethod
  fun setScreencastTrackBandwidth(bandwidth: Int, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureScreencastTrack(promise)) return@launch
      val trackId = localScreencastTrack?.id() ?: return@launch
      room?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun setScreencastTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureScreencastTrack(promise)) return@launch
      val trackId = localScreencastTrack?.id() ?: return@launch
      room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun setTargetTrackEncoding(trackId: String, encoding: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureConnected(promise)) return@launch
      val globalTrackId = getGlobalTrackId(trackId)
      if (globalTrackId == null) {
        promise.reject("E_INVALID_TRACK_ID", "Remote track with id=${trackId} not found")
        return@launch
      }
      room?.setTargetTrackEncoding(globalTrackId, encoding.toTrackEncoding())
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun toggleVideoTrackEncoding(encoding: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureVideoTrack(promise)) return@launch
      val trackId = localVideoTrack?.id() ?: return@launch
      videoSimulcastConfig = toggleTrackEncoding(encoding, trackId, videoSimulcastConfig)
      emitEvent("SimulcastConfigUpdate", getSimulcastConfigAsRNMap(videoSimulcastConfig))
      promise.resolve(getSimulcastConfigAsRNMap(videoSimulcastConfig))
    }
  }

  @ReactMethod
  fun setVideoTrackEncodingBandwidth(encoding: String, bandwidth: Int, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureVideoTrack(promise)) return@launch
      val trackId = localVideoTrack?.id() ?: return@launch
      room?.setEncodingBandwidth(trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth))
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun setVideoTrackBandwidth(bandwidth: Int, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      if (!ensureVideoTrack(promise)) return@launch
      val trackId = localVideoTrack?.id() ?: return@launch
      room?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun addListener(eventName: String?) {
  }

  @ReactMethod
  fun removeListeners(count: Int?) {
  }

  @ReactMethod
  fun changeWebRTCLoggingSeverity(severity: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      when (severity) {
        "verbose" -> room?.changeWebRTCLoggingSeverity(Logging.Severity.LS_VERBOSE)
        "info" -> room?.changeWebRTCLoggingSeverity(Logging.Severity.LS_INFO)
        "error" -> room?.changeWebRTCLoggingSeverity(Logging.Severity.LS_ERROR)
        "warning" -> room?.changeWebRTCLoggingSeverity(Logging.Severity.LS_WARNING)
        "none" -> room?.changeWebRTCLoggingSeverity(Logging.Severity.LS_NONE)
        else -> {
          promise.reject("E_INVALID_SEVERITY_LEVEL", "Severity with name=$severity not found")
          return@launch
        }
      }
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun getStatistics(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      promise.resolve(mapToRNMap(room?.getStats() as? Map<String, Any>))
    }
  }

  fun startScreencast(mediaProjectionPermission: Intent) {
    if (localScreencastTrack != null) return

    isScreenCastOn = true

    localScreencastId = UUID.randomUUID().toString()

    var videoParameters = when (screencastQuality) {
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

    localScreencastTrack =
      room?.createScreencastTrack(mediaProjectionPermission, videoParameters, screencastMetadata)

    localScreencastTrack?.let {
      val participant = participants[localParticipantId]
      participant!!.addOrUpdateTrack(it, screencastMetadata)
      emitParticipants()
    }
    screencastPromise?.resolve(isScreenCastOn)
  }

  private fun stopScreencast() {
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
    val participantsArray = Arguments.createArray()
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
    map.putMap(
      "selectedDevice",
      if (selectedDevice != null) audioDeviceAsRNMap(selectedDevice) else null
    )
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

  override fun onJoinSuccess(peerID: String, peersInRoom: List<Peer>) {
    CoroutineScope(Dispatchers.Main).launch {
      Log.d("MEM", "JOIN SUCCESS" + Thread.currentThread().name)
      participants.remove(peerID)
      peersInRoom.forEach {
        participants[it.id] = Participant(it.id, it.metadata)
      }
      joinPromise?.resolve(null)
      joinPromise = null
      emitParticipants()
    }
  }

  override fun onJoinError(metadata: Any) {
    CoroutineScope(Dispatchers.Main).launch {
      joinPromise?.reject("E_JOIN_ERROR", metadata.toString())
      joinPromise = null
    }
  }

  private fun addOrUpdateTrack(ctx: TrackContext) {
    val participant = participants[ctx.peer.id]
      ?: throw IllegalArgumentException("participant with id ${ctx.peer.id} not found")

    when (ctx.track) {
      is RemoteVideoTrack -> {
        val localTrackId = (ctx.track as RemoteVideoTrack).id()
        globalToLocalTrackId[ctx.trackId] = localTrackId
        participant.addOrUpdateTrack(ctx.track as RemoteVideoTrack, ctx.metadata)
        if (trackContexts[localTrackId] == null) {
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
        if (trackContexts[localTrackId] == null) {
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
    CoroutineScope(Dispatchers.Main).launch {
      addOrUpdateTrack(ctx)
    }
  }

  override fun onTrackAdded(ctx: TrackContext) {
  }

  override fun onTrackRemoved(ctx: TrackContext) {
    CoroutineScope(Dispatchers.Main).launch {
      val participant = participants[ctx.peer.id]
        ?: throw IllegalArgumentException("participant with id ${ctx.peer.id} not found")

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
  }

  override fun onTrackUpdated(ctx: TrackContext) {
    CoroutineScope(Dispatchers.Main).launch {
      addOrUpdateTrack(ctx)
    }
  }

  override fun onPeerJoined(peer: Peer) {
    CoroutineScope(Dispatchers.Main).launch {
      participants[peer.id] =
        Participant(id = peer.id, metadata = peer.metadata)
      emitParticipants()
    }
  }

  override fun onPeerLeft(peer: Peer) {
    CoroutineScope(Dispatchers.Main).launch {
      participants.remove(peer.id)
      emitParticipants()
    }
  }

  override fun onPeerUpdated(peer: Peer) {
  }

  override fun onSendMediaEvent(event: SerializedMediaEvent) {
    emitEvent("SendMediaEvent", event)
  }

  override fun onBandwidthEstimationChanged(estimation: Long) {
    emitEvent("BandwidthEstimation", estimation.toFloat())
  }
}
