package com.reactnativemembrane

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import org.membraneframework.rtc.media.AudioTrack
import android.media.projection.MediaProjectionManager
import androidx.appcompat.app.AppCompatActivity
import com.twilio.audioswitch.AudioDevice
import expo.modules.kotlin.Promise
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.exception.CodedException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.membraneframework.rtc.MembraneRTC
import org.membraneframework.rtc.MembraneRTCListener
import org.membraneframework.rtc.SimulcastConfig
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.media.LocalAudioTrack
import org.membraneframework.rtc.media.LocalScreencastTrack
import org.membraneframework.rtc.media.LocalVideoTrack
import org.membraneframework.rtc.media.RemoteAudioTrack
import org.membraneframework.rtc.media.RemoteVideoTrack
import org.membraneframework.rtc.media.TrackBandwidthLimit
import org.membraneframework.rtc.media.VideoParameters
import org.membraneframework.rtc.models.Endpoint
import org.membraneframework.rtc.models.RTCInboundStats
import org.membraneframework.rtc.models.RTCOutboundStats
import org.membraneframework.rtc.models.TrackContext
import org.membraneframework.rtc.utils.Metadata
import org.membraneframework.rtc.utils.SerializedMediaEvent
import org.webrtc.Logging
import java.util.UUID

class MembraneWebRTC(val sendEvent: (name: String, data: Map<String, Any?>) -> Unit) :
        MembraneRTCListener {
    private val SCREENCAST_REQUEST = 1
    private var membraneRTC: MembraneRTC? = null

    var localAudioTrack: LocalAudioTrack? = null
    var localVideoTrack: LocalVideoTrack? = null
    var localScreencastTrack: LocalScreencastTrack? = null
    var localEndpointId: String? = null

    private var localScreencastId: String? = null

    var isMicrophoneOn = true
    var isCameraOn = true
    var isScreencastOn = false

    private val globalToLocalTrackId = HashMap<String, String>()

    private var connectPromise: Promise? = null
    private var screencastPromise: Promise? = null

    var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()
    private var localUserMetadata: Metadata = mutableMapOf()

    var screencastQuality: String? = null
    var screencastSimulcastConfig: SimulcastConfig = SimulcastConfig()
    var screencastMaxBandwidth: TrackBandwidthLimit = TrackBandwidthLimit.BandwidthLimit(0)

    var screencastMetadata: Map<String, Any> = mutableMapOf()

    var trackContexts: MutableMap<String, TrackContext> = mutableMapOf()

    var audioSwitchManager: AudioSwitchManager? = null

    var appContext: AppContext? = null

    interface OnTrackUpdateListener {
        fun onTracksUpdate()
    }

    companion object {
        val endpoints = LinkedHashMap<String, RNEndpoint>()
        var onTracksUpdateListeners: MutableList<OnTrackUpdateListener> = mutableListOf()
    }

    fun onDestroy() {
        audioSwitchManager?.stop()
    }

    fun onActivityResult(
            requestCode: Int, resultCode: Int, data: Intent?
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

    private fun getSimulcastConfigFromOptions(simulcastConfigMap: com.reactnativemembrane.SimulcastConfig): SimulcastConfig {
        val simulcastEnabled = simulcastConfigMap.enabled
        val activeEncodings = simulcastConfigMap.activeEncodings.map { e -> e.toTrackEncoding() }
        return SimulcastConfig(
                enabled = simulcastEnabled, activeEncodings = activeEncodings
        )
    }

    private fun getMaxBandwidthFromOptions(
            maxBandwidthMap: Map<String, Int>?, maxBandwidthInt: Int
    ): TrackBandwidthLimit {
        if (maxBandwidthMap != null) {
            val maxBandwidthSimulcast = mutableMapOf<String, TrackBandwidthLimit.BandwidthLimit>()
            maxBandwidthMap.forEach {
                maxBandwidthSimulcast[it.key] = TrackBandwidthLimit.BandwidthLimit(it.value)
            }
            return TrackBandwidthLimit.SimulcastBandwidthLimit(maxBandwidthSimulcast)
        }
        return TrackBandwidthLimit.BandwidthLimit(maxBandwidthInt)
    }

    private fun getGlobalTrackId(localTrackId: String): String? {
        return globalToLocalTrackId.filterValues { it == localTrackId }.keys.firstOrNull()
    }

    private fun initLocalEndpoint() {
        val uuid = UUID.randomUUID().toString()
        localEndpointId = uuid
        val endpoint = RNEndpoint(
                id = uuid,
                metadata = localUserMetadata,
                type = "webrtc",
        )
        endpoints[uuid] = endpoint
        emitEndpoints()
    }

    fun create() {
        audioSwitchManager = AudioSwitchManager(appContext?.reactContext!!)
        membraneRTC = MembraneRTC.create(
                appContext = appContext?.reactContext!!, listener = this
        )
        ensureCreated()
        initLocalEndpoint()
    }

    private fun getVideoParametersFromOptions(createOptions: CameraConfig): VideoParameters {
        val videoMaxBandwidth =
                getMaxBandwidthFromOptions(createOptions.maxBandwidthMap, createOptions.maxBandwidthInt)
        var videoParameters = when (createOptions.quality) {
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
                dimensions = if (createOptions.flipVideo) videoParameters.dimensions.flip() else videoParameters.dimensions,
                simulcastConfig = videoSimulcastConfig,
                maxBitrate = videoMaxBandwidth
        )
        return videoParameters
    }

    private fun ensureCreated() {
        if (membraneRTC == null) {
            throw CodedException("Client not created yet. Make sure to call create() first!")
        }
    }

    private fun ensureConnected() {
        if (membraneRTC == null) {
            throw CodedException("Client not connected to server yet. Make sure to call connect() first!")
        }
    }

    private fun ensureVideoTrack() {
        if (localVideoTrack == null) {
            throw CodedException("No local video track. Make sure to call connect() first!")
        }
    }

    private fun ensureAudioTrack() {
        if (localAudioTrack == null) {
            throw CodedException("No local audio track. Make sure to call connect() first!")
        }
    }

    private fun ensureScreencastTrack() {
        if (localScreencastTrack == null) {
            throw CodedException("No local screencast track. Make sure to toggle screencast on first!")
        }
    }

    private fun ensureEndpoints() {
        if (localEndpointId == null || endpoints.size == 0) {
            throw CodedException("No endpoints available. Ensure the connection is established or endpoints are present.")
        }
    }


    fun receiveMediaEvent(data: String) {
        ensureConnected()
        membraneRTC?.receiveMediaEvent(data)
    }

    fun connect(endpointMetadata: Metadata = mapOf(), promise: Promise) {
        ensureCreated()
        ensureEndpoints()
        connectPromise = promise
        localUserMetadata = endpointMetadata
        val id = localEndpointId ?: return
        val endpoint = endpoints[id] ?: return
        endpoints[id] = endpoint.copy(metadata = localUserMetadata)
        membraneRTC?.connect(localUserMetadata)
    }

    fun disconnect() {
        ensureCreated()
        if (isScreencastOn) {
            stopScreencast()
        }
        membraneRTC?.disconnect()
        membraneRTC = null
        endpoints.clear()
    }

    fun startCamera(config: CameraConfig) {
        ensureConnected()
        val cameraTrack = createCameraTrack(config) ?: return
        localVideoTrack = cameraTrack
        addTrackToLocalEndpoint(cameraTrack, config.videoTrackMetadata)
        setCameraTrackState(cameraTrack, config.cameraEnabled)
    }

    private fun createCameraTrack(config: CameraConfig): LocalVideoTrack? {
        ensureConnected()
        val videoParameters = getVideoParametersFromOptions(config)
        videoSimulcastConfig = getSimulcastConfigFromOptions(config.simulcastConfig)
        return membraneRTC?.createVideoTrack(
                videoParameters, config.videoTrackMetadata, config.captureDeviceId
        )
    }

    private fun setCameraTrackState(cameraTrack: LocalVideoTrack, isEnabled: Boolean) {
        ensureConnected()
        cameraTrack.setEnabled(isEnabled)
        isCameraOn = isEnabled
        val eventName = EmitableEvents.IsCameraOn
        val isCameraOnMap = mapOf(eventName to isEnabled)
        emitEvent(eventName, isCameraOnMap)
    }

    private fun addTrackToLocalEndpoint(track: VideoTrack, metadata: Metadata = mapOf()) {
        ensureEndpoints()
        val localEndpoint = endpoints[localEndpointId]
        localEndpoint?.let {
            it.addOrUpdateTrack(track, metadata)
            emitEndpoints()
        }
    }

    fun toggleCamera(): Boolean {
        ensureVideoTrack()
        localVideoTrack?.let { setCameraTrackState(it, !isCameraOn) }
        return isCameraOn
    }

    fun flipCamera() {
        ensureVideoTrack()
        localVideoTrack?.flipCamera()
    }

    fun switchCamera(captureDeviceId: String) {
        ensureVideoTrack()
        localVideoTrack?.switchCamera(captureDeviceId)
    }

    private fun addTrackToLocalEndpoint(track: AudioTrack, metadata: Metadata = mapOf()) {
        ensureEndpoints()
        val localEndpoint = endpoints[localEndpointId]
        localEndpoint?.let {
            it.addOrUpdateTrack(track, metadata)
            emitEndpoints()
        }
    }

    private fun removeTrackFromLocalEndpoint(track: VideoTrack) {
        ensureEndpoints()
        val localEndpoint = endpoints[localEndpointId]
        localEndpoint?.let {
            it.removeTrack(track)
            membraneRTC?.removeTrack(track.id())
            emitEndpoints()
        }
    }

    private fun removeTrackFromLocalEndpoint(track: AudioTrack) {
        ensureEndpoints()
        val localEndpoint = endpoints[localEndpointId]
        localEndpoint?.let {
            it.removeTrack(track)
            membraneRTC?.removeTrack(track.id())
            emitEndpoints()
        }
    }

    fun startMicrophone(config: MicrophoneConfig) {
        ensureConnected()
        val microphoneTrack = membraneRTC?.createAudioTrack(config.audioTrackMetadata)
                ?: throw CodedException("Failed to Create Track")
        localAudioTrack = microphoneTrack
        addTrackToLocalEndpoint(microphoneTrack, config.audioTrackMetadata)
        setMicrophoneTrackState(microphoneTrack, config.microphoneEnabled)
    }

    private fun setMicrophoneTrackState(microphoneTrack: LocalAudioTrack, isEnabled: Boolean) {
        ensureConnected()
        microphoneTrack.setEnabled(isEnabled)
        isMicrophoneOn = isEnabled
        val eventName = EmitableEvents.IsMicrophoneOn
        val isMicrophoneOnMap = mapOf(eventName to isEnabled)
        emitEvent(eventName, isMicrophoneOnMap)
    }

    fun toggleMicrophone(): Boolean {
        ensureAudioTrack()
        localAudioTrack?.let { setMicrophoneTrackState(it, !isMicrophoneOn) }
        return isMicrophoneOn
    }

    fun toggleScreencast(screencastOptions: ScreencastOptions, promise: Promise) {
        this.screencastMetadata = screencastOptions.screencastMetadata
        this.screencastQuality = screencastOptions.quality
        this.screencastSimulcastConfig =
                getSimulcastConfigFromOptions(screencastOptions.simulcastConfig)
        this.screencastMaxBandwidth = getMaxBandwidthFromOptions(
                screencastOptions.maxBandwidthMap, screencastOptions.maxBandwidthInt
        )
        screencastPromise = promise
        if (!isScreencastOn) {
            ensureConnected()
            val currentActivity = appContext?.currentActivity ?: throw ActivityNotFoundException()

            val mediaProjectionManager =
                    appContext?.reactContext!!.getSystemService(AppCompatActivity.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
            val intent = mediaProjectionManager.createScreenCaptureIntent()
            currentActivity.startActivityForResult(intent, SCREENCAST_REQUEST)
        } else {
            stopScreencast()
        }
    }

    fun getEndpoints(): List<Map<String, Any?>> {
        return endpoints.values.map { endpoint ->
            mapOf("id" to endpoint.id,
                    "isLocal" to (endpoint.id == localEndpointId),
                    "type" to endpoint.type,
                    "metadata" to endpoint.metadata,
                    "tracks" to endpoint.videoTracks.values.map { video ->
                        mapOf(
                                "id" to video.id(),
                                "type" to "Video",
                                "metadata" to (endpoint.tracksMetadata[video.id()] ?: emptyMap()),
                                "encoding" to trackContexts[video.id()]?.encoding?.rid,
                                "encodingReason" to trackContexts[video.id()]?.encodingReason?.value,
                        )
                    } + endpoint.audioTracks.values.map { audio ->
                        mapOf(
                                "id" to audio.id(),
                                "type" to "Audio",
                                "metadata" to (endpoint.tracksMetadata[audio.id()] ?: emptyMap()),
                                "vadStatus" to trackContexts[audio.id()]?.vadStatus?.value
                        )
                    })
        }
    }

    fun getCaptureDevices(): List<Map<String, Any>> {
        val devices = LocalVideoTrack.getCaptureDevices(appContext?.reactContext!!)
        return devices.map { device ->
            mapOf<String, Any>(
                    "id" to device.deviceName,
                    "name" to device.deviceName,
                    "isFrontFacing" to device.isFrontFacing,
                    "isBackFacing" to device.isBackFacing
            )
        }
    }

    fun updateEndpointMetadata(metadata: Metadata) {
        ensureConnected()
        membraneRTC?.updateEndpointMetadata(metadata)
    }

    private fun updateTrackMetadata(trackId: String, metadata: Metadata) {
        membraneRTC?.updateTrackMetadata(trackId, metadata)
        localEndpointId?.let {
            val endpoint = endpoints[it] ?: throw CodedException("Endpoint with id $it not Found")
            endpoint.tracksMetadata[trackId] = metadata
            emitEndpoints()
        }
    }

    fun updateLocalVideoTrackMetadata(metadata: Metadata) {
        ensureVideoTrack()
        localVideoTrack?.let {
            val trackId = it.rtcTrack().id()
            updateTrackMetadata(trackId, metadata)
        }
    }

    fun updateLocalAudioTrackMetadata(metadata: Metadata) {
        ensureAudioTrack()
        localAudioTrack?.let {
            val trackId = it.rtcTrack().id()
            updateTrackMetadata(trackId, metadata)
        }
    }

    fun updateLocalScreencastTrackMetadata(metadata: Metadata) {
        ensureScreencastTrack()
        localScreencastTrack?.let {
            val trackId = it.rtcTrack().id()
            updateTrackMetadata(trackId, metadata)
        }
    }

    fun setOutputAudioDevice(audioDevice: String) {
        audioSwitchManager?.selectAudioOutput(AudioDeviceKind.fromTypeName(audioDevice))
    }

    fun startAudioSwitcher() {
        audioSwitchManager?.let {
            it.start(this::emitAudioDeviceEvent)
            emitAudioDeviceEvent(
                    it.availableAudioDevices(), it.selectedAudioDevice()
            )
        }
    }

    fun stopAudioSwitcher() {
        audioSwitchManager?.stop()
    }

    private fun toggleTrackEncoding(
            encoding: String, trackId: String, simulcastConfig: SimulcastConfig
    ): SimulcastConfig {
        val trackEncoding = encoding.toTrackEncoding()

        val isTrackEncodingActive = simulcastConfig.activeEncodings.contains(trackEncoding)

        if (isTrackEncodingActive) {
            membraneRTC?.disableTrackEncoding(trackId, trackEncoding)
        } else {
            membraneRTC?.enableTrackEncoding(trackId, trackEncoding)
        }

        val updatedActiveEncodings = if (isTrackEncodingActive) {
            simulcastConfig.activeEncodings.filter { it != trackEncoding }
        } else {
            simulcastConfig.activeEncodings + trackEncoding
        }

        return SimulcastConfig(
                enabled = true, activeEncodings = updatedActiveEncodings
        )
    }

    fun toggleScreencastTrackEncoding(encoding: String): Map<String, Any> {
        ensureScreencastTrack()
        localScreencastTrack?.let {
            val trackId = it.id()
            screencastSimulcastConfig = toggleTrackEncoding(encoding, trackId, screencastSimulcastConfig)
        }
        return getSimulcastConfigAsRNMap(screencastSimulcastConfig)
    }

    fun setScreencastTrackBandwidth(bandwidth: Int) {
        ensureScreencastTrack()
        localScreencastTrack?.let {
            val trackId = it.id()
            membraneRTC?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
        }
    }

    fun setScreencastTrackEncodingBandwidth(encoding: String, bandwidth: Int) {
        ensureScreencastTrack()
        localScreencastTrack?.let {
            val trackId = it.id()
            membraneRTC?.setEncodingBandwidth(
                    trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth)
            )
        }
    }

    fun setTargetTrackEncoding(trackId: String, encoding: String) {
        ensureConnected()
        val globalTrackId =
                getGlobalTrackId(trackId)
                        ?: throw CodedException("Remote track with id=$trackId not found")
        membraneRTC?.setTargetTrackEncoding(globalTrackId, encoding.toTrackEncoding())
    }

    fun toggleVideoTrackEncoding(encoding: String): Map<String, Any> {
        ensureVideoTrack()
        val trackId = localVideoTrack?.id() ?: return emptyMap()
        videoSimulcastConfig = toggleTrackEncoding(encoding, trackId, videoSimulcastConfig)
        val eventName = EmitableEvents.SimulcastConfigUpdate
        emitEvent(eventName, getSimulcastConfigAsRNMap(videoSimulcastConfig))
        return getSimulcastConfigAsRNMap(videoSimulcastConfig)
    }

    fun setVideoTrackEncodingBandwidth(encoding: String, bandwidth: Int) {
        ensureVideoTrack()
        localVideoTrack?.let {
            val trackId = it.id()
            membraneRTC?.setEncodingBandwidth(
                    trackId, encoding, TrackBandwidthLimit.BandwidthLimit(bandwidth)
            )
        }
    }

    fun setVideoTrackBandwidth(bandwidth: Int) {
        ensureVideoTrack()
        localVideoTrack?.let {
            val trackId = it.id()
            membraneRTC?.setTrackBandwidth(trackId, TrackBandwidthLimit.BandwidthLimit(bandwidth))
        }
    }

    fun changeWebRTCLoggingSeverity(severity: String) {
        when (severity) {
            "verbose" -> membraneRTC?.changeWebRTCLoggingSeverity(Logging.Severity.LS_VERBOSE)
            "info" -> membraneRTC?.changeWebRTCLoggingSeverity(Logging.Severity.LS_INFO)
            "error" -> membraneRTC?.changeWebRTCLoggingSeverity(Logging.Severity.LS_ERROR)
            "warning" -> membraneRTC?.changeWebRTCLoggingSeverity(Logging.Severity.LS_WARNING)
            "none" -> membraneRTC?.changeWebRTCLoggingSeverity(Logging.Severity.LS_NONE)
            else -> {
                throw CodedException("Severity with name=$severity not found")
            }
        }
    }

    private fun rtcOutboundStatsToRNMap(stats: RTCOutboundStats): Map<String, Any?> {
        val innerMap = mutableMapOf<String, Double>()
        innerMap["bandwidth"] = stats.qualityLimitationDurations?.bandwidth ?: 0.0
        innerMap["cpu"] = stats.qualityLimitationDurations?.cpu ?: 0.0
        innerMap["none"] = stats.qualityLimitationDurations?.none ?: 0.0
        innerMap["other"] = stats.qualityLimitationDurations?.other ?: 0.0

        val res = mutableMapOf<String, Any?>()
        res["kind"] = stats.kind
        res["rid"] = stats.rid
        res["bytesSent"] = stats.bytesSent?.toInt() ?: 0
        res["targetBitrate"] = stats.targetBitrate ?: 0.0
        res["packetsSent"] = stats.packetsSent?.toInt() ?: 0
        res["framesEncoded"] = stats.framesEncoded?.toInt() ?: 0
        res["framesPerSecond"] = stats.framesPerSecond ?: 0.0
        res["frameWidth"] = stats.frameWidth?.toInt() ?: 0
        res["frameHeight"] = stats.frameHeight?.toInt() ?: 0
        res["qualityLimitationDurations"] = innerMap

        return res
    }

    private fun rtcInboundStatsToRNMap(stats: RTCInboundStats): Map<String, Any?> {
        val res = mutableMapOf<String, Any?>()
        res["kind"] = stats.kind
        res["jitter"] = stats.jitter ?: 0.0
        res["packetsLost"] = stats.packetsLost ?: 0
        res["packetsReceived"] = stats.packetsReceived?.toInt() ?: 0
        res["bytesReceived"] = stats.bytesReceived?.toInt() ?: 0
        res["framesReceived"] = stats.framesReceived ?: 0
        res["frameWidth"] = stats.frameWidth?.toInt() ?: 0
        res["frameHeight"] = stats.frameHeight?.toInt() ?: 0
        res["framesPerSecond"] = stats.framesPerSecond ?: 0.0
        res["framesDropped"] = stats.framesDropped?.toInt() ?: 0

        return res
    }

    fun getStatistics(): MutableMap<String, Map<String, Any?>> {
        ensureCreated()
        val newMap = mutableMapOf<String, Map<String, Any?>>()
        membraneRTC?.getStats()?.forEach { entry ->
            newMap[entry.key] = if (entry.value is RTCInboundStats) rtcInboundStatsToRNMap(
                    entry.value as RTCInboundStats
            ) else rtcOutboundStatsToRNMap(entry.value as RTCOutboundStats)
        }
        return newMap
    }

    private fun startScreencast(mediaProjectionPermission: Intent) {
        localScreencastId = UUID.randomUUID().toString()
        val videoParameters = getScreencastVideoParameters()
        val screencastTrack = membraneRTC?.createScreencastTrack(
                mediaProjectionPermission, videoParameters, screencastMetadata
        ) ?: throw CodedException("Failed to Create ScreenCast Track")
        localScreencastTrack = screencastTrack
        addTrackToLocalEndpoint(screencastTrack, screencastMetadata)
        setScreencastTrackState(true)

        screencastPromise?.resolve(isScreencastOn)
    }

    private fun getScreencastVideoParameters(): VideoParameters {
        val videoParameters = when (screencastQuality) {
            "VGA" -> VideoParameters.presetScreenShareVGA
            "HD5" -> VideoParameters.presetScreenShareHD5
            "HD15" -> VideoParameters.presetScreenShareHD15
            "FHD15" -> VideoParameters.presetScreenShareFHD15
            "FHD30" -> VideoParameters.presetScreenShareFHD30
            else -> VideoParameters.presetScreenShareHD15
        }
        val dimensions = videoParameters.dimensions.flip()
        return videoParameters.copy(
                dimensions = dimensions,
                simulcastConfig = screencastSimulcastConfig,
                maxBitrate = screencastMaxBandwidth,
        )
    }

    private fun setScreencastTrackState(isEnabled: Boolean) {
        isScreencastOn = isEnabled
        val eventName = EmitableEvents.IsScreencastOn
        emitEvent(eventName, mapOf(eventName to isEnabled))
        emitEndpoints()
    }

    private fun stopScreencast() {
        ensureScreencastTrack()
        localScreencastTrack?.let {
            removeTrackFromLocalEndpoint(it)
            localScreencastTrack = null
        }

        setScreencastTrackState(false)
        screencastPromise?.resolve(isScreencastOn)
        screencastPromise = null
    }

    private fun emitEvent(eventName: String, data: Map<String, Any?>) {
        sendEvent(eventName, data)
    }

    private fun emitEndpoints() {
        val eventName = EmitableEvents.EndpointsUpdate
        val map = mapOf(eventName to getEndpoints())
        emitEvent(eventName, map)
    }

    private fun audioDeviceAsRNMap(audioDevice: AudioDevice): Map<String, String?> {
        return mapOf(
                "name" to audioDevice.name,
                "type" to AudioDeviceKind.fromAudioDevice(audioDevice)?.typeName
        )
    }

    private fun emitAudioDeviceEvent(
            audioDevices: List<AudioDevice>, selectedDevice: AudioDevice?
    ) {
        val eventName = EmitableEvents.AudioDeviceUpdate
        val map =
                mapOf(eventName to mapOf("selectedDevice" to (if (selectedDevice != null) audioDeviceAsRNMap(selectedDevice) else null),
                        "availableDevices" to audioDevices.map { audioDevice ->
                            audioDeviceAsRNMap(
                                    audioDevice
                            )
                        }))

        emitEvent(eventName, map)
    }

    private fun getSimulcastConfigAsRNMap(simulcastConfig: SimulcastConfig): Map<String, Any> {
        return mapOf("enabled" to simulcastConfig.enabled,
                "activeEncodings" to simulcastConfig.activeEncodings.map {
                    it.rid
                })
    }

    override fun onConnected(endpointID: String, otherEndpoints: List<Endpoint>) {
        CoroutineScope(Dispatchers.Main).launch {
            endpoints.remove(endpointID)
            otherEndpoints.forEach {
                endpoints[it.id] = RNEndpoint(it.id, it.metadata ?: mapOf() , it.type)
            }
            connectPromise?.resolve(null)
            connectPromise = null
            emitEndpoints()
        }
    }

    override fun onConnectError(metadata: Any) {
        CoroutineScope(Dispatchers.Main).launch {
            connectPromise?.reject(CodedException("Connection error: $metadata"))
            connectPromise = null
        }
    }

    private fun addOrUpdateTrack(ctx: TrackContext) {
        val endpoint = endpoints[ctx.endpoint.id]
                ?: throw IllegalArgumentException("endpoint with id ${ctx.endpoint.id} not found")

        when (ctx.track) {
            is RemoteVideoTrack -> {
                val localTrackId = (ctx.track as RemoteVideoTrack).id()
                globalToLocalTrackId[ctx.trackId] = localTrackId
                endpoint.addOrUpdateTrack(ctx.track as RemoteVideoTrack, ctx.metadata)
                if (trackContexts[localTrackId] == null) {
                    trackContexts[localTrackId] = ctx
                    ctx.setOnEncodingChangedListener {
                        emitEndpoints()
                    }
                }
            }

            is RemoteAudioTrack -> {
                val localTrackId = (ctx.track as RemoteAudioTrack).id()
                globalToLocalTrackId[ctx.trackId] = localTrackId
                endpoint.addOrUpdateTrack(ctx.track as RemoteAudioTrack, ctx.metadata)
                if (trackContexts[localTrackId] == null) {
                    trackContexts[localTrackId] = ctx
                    ctx.setOnVoiceActivityChangedListener {
                        emitEndpoints()
                    }
                }
            }

            else -> throw IllegalArgumentException("invalid type of incoming remote track")
        }

        emitEndpoints()
        onTracksUpdateListeners.forEach { it.onTracksUpdate() }
    }

    override fun onTrackReady(ctx: TrackContext) {
        CoroutineScope(Dispatchers.Main).launch {
            addOrUpdateTrack(ctx)
        }
    }

    override fun onTrackAdded(ctx: TrackContext) {}

    override fun onTrackRemoved(ctx: TrackContext) {
        CoroutineScope(Dispatchers.Main).launch {
            val endpoint = endpoints[ctx.endpoint.id]
                    ?: throw IllegalArgumentException("endpoint with id ${ctx.endpoint.id} not found")

            when (ctx.track) {
                is RemoteVideoTrack -> endpoint.removeTrack(ctx.track as RemoteVideoTrack)
                is RemoteAudioTrack -> endpoint.removeTrack(ctx.track as RemoteAudioTrack)
                else -> throw IllegalArgumentException("invalid type of incoming remote track")
            }

            globalToLocalTrackId.remove(ctx.trackId)
            ctx.setOnEncodingChangedListener(null)
            ctx.setOnVoiceActivityChangedListener(null)
            trackContexts.remove(ctx.trackId)
            emitEndpoints()
            onTracksUpdateListeners.forEach { it.onTracksUpdate() }
        }
    }

    override fun onTrackUpdated(ctx: TrackContext) {
        CoroutineScope(Dispatchers.Main).launch {
            addOrUpdateTrack(ctx)
        }
    }

    override fun onEndpointAdded(endpoint: Endpoint) {
        CoroutineScope(Dispatchers.Main).launch {
            endpoints[endpoint.id] =
                    RNEndpoint(id = endpoint.id, metadata = endpoint.metadata, type = endpoint.type)
            emitEndpoints()
        }
    }

    override fun onEndpointRemoved(endpoint: Endpoint) {
        CoroutineScope(Dispatchers.Main).launch {
            endpoints.remove(endpoint.id)
            emitEndpoints()
        }
    }

    override fun onEndpointUpdated(endpoint: Endpoint) {}

    override fun onSendMediaEvent(event: SerializedMediaEvent) {
        val eventName = EmitableEvents.SendMediaEvent
        emitEvent(eventName, mapOf("event" to event))
    }

    override fun onBandwidthEstimationChanged(estimation: Long) {
        val eventName = EmitableEvents.BandwidthEstimation
        emitEvent(eventName, mapOf(eventName to estimation.toFloat()))
    }

    override fun onDisconnected() {}


}
