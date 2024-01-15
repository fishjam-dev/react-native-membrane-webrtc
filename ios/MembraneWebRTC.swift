import AVKit
import ExpoModulesCore
import MembraneRTC
import React
import ReplayKit
import WebRTC
import os.log

let log = OSLog(subsystem: "com.swm.membranewebrtc", category: "ErrorHandling")

#if os(iOS)
    @available(iOS 12, *)
    extension RPSystemBroadcastPickerView {
        public static func show(
            for preferredExtension: String? = nil, showsMicrophoneButton: Bool = false
        ) {
            let view = RPSystemBroadcastPickerView()
            view.preferredExtension = preferredExtension
            view.showsMicrophoneButton = showsMicrophoneButton
            let selector = NSSelectorFromString("buttonPressed:")
            if view.responds(to: selector) {
                view.perform(selector, with: nil)
            }
        }
    }
#endif

extension [String: Any] {
    public func toMetadata() -> Metadata {
        var res: Metadata = .init()
        self.forEach { entry in
            res[entry.key] = entry.value
        }
        return res
    }
}

extension AnyJson {
    public func toDict() -> [String: Any] {
        var res: [String: Any] = [:]
        self.keys.forEach { key in
            res[key] = self[key]
        }
        return res
    }
}

extension String: Error {}

extension String {
    public func toTrackEncoding() -> TrackEncoding? {
        switch self {
        case "l":
            return TrackEncoding.l
        case "m":
            return TrackEncoding.m
        case "h":
            return TrackEncoding.h
        default:
            return nil
        }
    }
}

class MembraneWebRTC: MembraneRTCDelegate {
    var membraneRTC: MembraneRTC? = nil

    var localAudioTrack: LocalAudioTrack?
    var localVideoTrack: LocalVideoTrack?
    var localScreencastTrack: LocalScreenBroadcastTrack?
    var localEndpointId: String?

    var isMicEnabled: Bool = true
    var isCameraEnabled: Bool = true
    var isScreensharingEnabled: Bool = false

    var globalToLocalTrackId: [String: String] = [:]

    var connectPromise: Promise? = nil

    var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()
    var localUserMetadata: Metadata = .init()

    var screencastSimulcastConfig: SimulcastConfig = SimulcastConfig()
    var screencastMaxBandwidth: TrackBandwidthLimit = .BandwidthLimit(0)

    var tracksContexts: [String: TrackContext] = [:]

    var captureDeviceId: String? = nil

    var audioSessionMode: AVAudioSession.Mode = AVAudioSession.Mode.videoChat
    var errorMessage: String?

    let sendEvent: (_ eventName: String, _ data: [String: Any]) -> Void

    init(sendEvent: @escaping (_ eventName: String, _ data: [String: Any]) -> Void) {
        self.sendEvent = sendEvent
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(onRouteChangeNotification),
            name: AVAudioSession.routeChangeNotification,
            object: nil
        )
    }

    private func getSimulcastConfigFromOptions(simulcastConfig: RNSimulcastConfig) throws
        -> SimulcastConfig?
    {
        var activeEncodings: [TrackEncoding] = []
        try simulcastConfig.activeEncodings.forEach({ e in
            activeEncodings.append(try validateEncoding(encoding: e))
        })
        return SimulcastConfig(
            enabled: simulcastConfig.enabled,
            activeEncodings: activeEncodings
        )
    }

    private func getMaxBandwidthFromOptions(maxBandwidth: RNTrackBandwidthLimit)
        -> TrackBandwidthLimit
    {
        if let maxBandwidth: Int = maxBandwidth.get() {
            return .BandwidthLimit(maxBandwidth)
        } else if let maxBandwidth: [String: Int] = maxBandwidth.get() {
            return .SimulcastBandwidthLimit(maxBandwidth)
        }
        return .BandwidthLimit(0)
    }
    private func getGlobalTrackId(localTrackId: String) -> String? {
        return globalToLocalTrackId.filter { $0.value == localTrackId }.first?.key
    }

    private func validateEncoding(encoding: String) throws -> TrackEncoding {
        let trackEncoding = encoding.toTrackEncoding()
        guard let trackEncoding = trackEncoding else {
            throw Exception(
                name: "E_INVALID_ENCODING", description: "Invalid track encoding specified: \(encoding)")
        }
        return trackEncoding
    }
    private func initLocalEndpoint() {
        let uuid = UUID().uuidString
        self.localEndpointId = uuid
        let endpoint = RNEndpoint(
            id: uuid,
            metadata: localUserMetadata,
            type: "webrtc"
        )
        MembraneRoom.sharedInstance.endpoints[uuid] = endpoint
        emitEndpoints()
    }

    func create() throws {
        self.membraneRTC = MembraneRTC.create(delegate: self)
        try ensureCreated()
        initLocalEndpoint()
    }

    func getVideoParametersFromOptions(connectionOptions: CameraConfig) -> VideoParameters {
        let videoQuality = connectionOptions.quality
        let flipVideo = connectionOptions.flipVideo
        let videoBandwidthLimit = getMaxBandwidthFromOptions(
            maxBandwidth: connectionOptions.maxBandwidth)

        let preset: VideoParameters = {
            switch videoQuality {
            case "QVGA169":
                return VideoParameters.presetQVGA169
            case "VGA169":
                return VideoParameters.presetVGA169
            case "VQHD169":
                return VideoParameters.presetQHD169
            case "HD169":
                return VideoParameters.presetHD169
            case "FHD169":
                return VideoParameters.presetFHD169
            case "QVGA43":
                return VideoParameters.presetQVGA43
            case "VGA43":
                return VideoParameters.presetVGA43
            case "VQHD43":
                return VideoParameters.presetQHD43
            case "HD43":
                return VideoParameters.presetHD43
            case "FHD43":
                return VideoParameters.presetFHD43
            default:
                return VideoParameters.presetVGA169
            }
        }()
        let videoParameters = VideoParameters(
            dimensions: flipVideo ? preset.dimensions.flip() : preset.dimensions,
            maxBandwidth: videoBandwidthLimit,
            simulcastConfig: self.videoSimulcastConfig
        )
        return videoParameters
    }
    private func ensureCreated() throws {
        if membraneRTC == nil {
            throw Exception(
                name: "E_NO_MEMBRANERTC",
                description: "Client not created yet. Make sure to call create() first!")
        }
    }
    private func ensureConnected() throws {
        if membraneRTC == nil {
            throw Exception(
                name: "E_NOT_CONNECTED",
                description: "Client not connected to server yet. Make sure to call connect() first!")
        }
    }

    private func ensureVideoTrack() throws {
        if membraneRTC == nil {
            throw Exception(
                name: "E_NO_LOCAL_VIDEO_TRACK",
                description: "No local video track. Make sure to call connect() first!")
        }
    }

    private func ensureAudioTrack() throws {
        if membraneRTC == nil {
            throw Exception(
                name: "E_NO_LOCAL_AUDIO_TRACK",
                description: "No local audio track. Make sure to call connect() first!")
        }
    }

    private func ensureScreencastTrack() throws {
        if membraneRTC == nil {
            throw Exception(
                name: "E_NO_LOCAL_SCREENCAST_TRACK",
                description: "No local screencast track. Make sure to toggle screencast on first!")
        }
    }
    private func ensureEndpoints() throws {
        guard let _ = localEndpointId, !MembraneRoom.sharedInstance.endpoints.isEmpty else {
            throw Exception(
                name: "E_NO_ENDPOINTS",
                description:
                    "No endpoints available. Ensure the connection is established or endpoints are present.")
        }
    }

    func receiveMediaEvent(data: String) throws {
        try ensureConnected()
        membraneRTC?.receiveMediaEvent(mediaEvent: data as SerializedMediaEvent)
    }

    func connect(metadata: [String: Any], promise: Promise) {
        connectPromise = promise
        localUserMetadata = metadata.toMetadata()

        guard let localEndpointId = localEndpointId,
            var endpoint = MembraneRoom.sharedInstance.endpoints[localEndpointId]
        else {
            return
        }

        endpoint.metadata = metadata.toMetadata()
        membraneRTC?.connect(metadata: metadata.toMetadata())
    }

    func disconnect() {
        if isScreensharingEnabled {
            let screencastExtensionBundleId =
                Bundle.main.infoDictionary?["ScreencastExtensionBundleId"] as? String
            DispatchQueue.main.async {
                RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
            }
        }
        membraneRTC?.remove(delegate: self)
        membraneRTC?.disconnect()
        membraneRTC = nil
        MembraneRoom.sharedInstance.endpoints = [:]
    }

    func startCamera(config: CameraConfig) throws {
        try ensureConnected()
        guard let cameraTrack = try createCameraTrack(config: config) else { return }
        localVideoTrack = cameraTrack
        try addTrackToLocalEndpoint(cameraTrack, config.videoTrackMetadata.toMetadata())
        try setCameraTrackState(cameraTrack: cameraTrack, isEnabled: config.cameraEnabled)
    }
    private func createCameraTrack(config: CameraConfig) throws -> LocalVideoTrack? {
        try ensureConnected()
        let videoParameters = getVideoParametersFromOptions(connectionOptions: config)
        guard
            let simulcastConfig = try getSimulcastConfigFromOptions(
                simulcastConfig: config.simulcastConfig)
        else { return nil }
        self.videoSimulcastConfig = simulcastConfig
        return membraneRTC?.createVideoTrack(
            videoParameters: videoParameters, metadata: config.videoTrackMetadata.toMetadata(),
            captureDeviceId: config.captureDeviceId
        )
    }
    private func setCameraTrackState(cameraTrack: LocalVideoTrack, isEnabled: Bool) throws {
        try ensureConnected()
        cameraTrack.setEnabled(isEnabled)
        isCameraEnabled = isEnabled
        let eventName = EmitableEvents.IsCameraOn
        let isCameraEnabledMap = [eventName: isEnabled]
        emitEvent(name: eventName, data: isCameraEnabledMap)
    }
    private func addTrackToLocalEndpoint(_ track: LocalVideoTrack, _ metadata: Metadata) throws {
        try ensureEndpoints()
        if let localEndpointId = localEndpointId {
            MembraneRoom.sharedInstance.endpoints[localEndpointId]?.videoTracks = [track.trackId(): track]
            MembraneRoom.sharedInstance.endpoints[localEndpointId]?.tracksMetadata[track.trackId()] =
                metadata
            emitEndpoints()
        }
    }

    func toggleCamera() throws -> Bool {
        try ensureVideoTrack()
        if let localVideoTrack = self.localVideoTrack {
            try setCameraTrackState(cameraTrack: localVideoTrack, isEnabled: !isCameraEnabled)
        }
        return isCameraEnabled
    }

    func flipCamera() throws {
        try ensureVideoTrack()
        if let cameraTrack = localVideoTrack as? LocalCameraVideoTrack {
            cameraTrack.switchCamera()
        }
    }

    func switchCamera(captureDeviceId: String) throws {
        try ensureVideoTrack()
        if let cameraTrack = localVideoTrack as? LocalCameraVideoTrack {
            cameraTrack.switchCamera(deviceId: captureDeviceId as String)
        }
    }
    private func addTrackToLocalEndpoint(_ track: LocalAudioTrack, _ metadata: Metadata) throws {
        try ensureEndpoints()
        if let localEndpointId = localEndpointId {
            MembraneRoom.sharedInstance.endpoints[localEndpointId]?.audioTracks = [track.trackId(): track]
            MembraneRoom.sharedInstance.endpoints[localEndpointId]?.tracksMetadata[track.trackId()] =
                metadata
            emitEndpoints()
        }
    }
    private func removeTrackFromLocalEndpoint(_ track: LocalVideoTrack) throws {
        try ensureEndpoints()
        if let localEndpointId = localEndpointId {
            guard let localEndpoint = MembraneRoom.sharedInstance.endpoints[localEndpointId] else {
                return
            }
            MembraneRoom.sharedInstance.endpoints[localEndpointId] = localEndpoint.removeTrack(
                trackId: track.trackId())
            emitEndpoints()
        }
    }
    func startMicrophone(config: MicrophoneConfig) throws {
        try ensureConnected()
        guard
            let microphoneTrack = membraneRTC?.createAudioTrack(
                metadata: config.audioTrackMetadata.toMetadata())
        else { return }
        localAudioTrack = microphoneTrack
        setAudioSessionMode()
        try addTrackToLocalEndpoint(microphoneTrack, config.audioTrackMetadata.toMetadata())
        try setMicrophoneTrackState(microphoneTrack, config.microphoneEnabled)
    }
    private func setMicrophoneTrackState(_ microphoneTrack: LocalAudioTrack, _ isEnabled: Bool) throws {
        try ensureConnected()
        microphoneTrack.setEnabled(isEnabled)
        isMicEnabled = isEnabled
        let eventName = EmitableEvents.IsMicrophoneOn
        let isMicEnabledMap = [eventName: isEnabled]
        emitEvent(name: eventName, data: isMicEnabledMap)
    }
    func toggleMicrophone() throws -> Bool {
        try ensureAudioTrack()
        if let localAudioTrack = localAudioTrack {
            try setMicrophoneTrackState(localAudioTrack, !isMicEnabled)
        }
        return isMicEnabled
    }
    private func getScreencastVideoParameters(screencastOptions: ScreencastOptions) -> VideoParameters {
        let preset: VideoParameters
        switch screencastOptions.quality {
        case "VGA":
            preset = VideoParameters.presetScreenShareVGA
        case "HD5":
            preset = VideoParameters.presetScreenShareHD5
        case "HD15":
            preset = VideoParameters.presetScreenShareHD15
        case "FHD15":
            preset = VideoParameters.presetScreenShareFHD15
        case "FHD30":
            preset = VideoParameters.presetScreenShareFHD30
        default:
            preset = VideoParameters.presetScreenShareHD15
        }
        return VideoParameters(
            dimensions: preset.dimensions.flip(),
            maxBandwidth: screencastMaxBandwidth,
            maxFps: preset.maxFps,
            simulcastConfig: screencastSimulcastConfig
        )
    }
    private func setScreencastTrackState(isEnabled: Bool) throws {
        isScreensharingEnabled = isEnabled
        let eventName = EmitableEvents.IsScreencastOn
        let isScreencastEnabled = [eventName: isEnabled]
        emitEvent(name: eventName, data: isScreencastEnabled)
    }
    func toggleScreencast(screencastOptions: ScreencastOptions) throws {
        try ensureConnected()
        guard
            let screencastExtensionBundleId = Bundle.main.infoDictionary?["ScreencastExtensionBundleId"]
                as? String
        else {
            throw Exception(
                name: "E_NO_BUNDLE_ID_SET",
                description:
                    "No screencast extension bundle id set. Please set ScreencastExtensionBundleId in Info.plist"
            )
        }
        guard let appGroupName = Bundle.main.infoDictionary?["AppGroupName"] as? String else {
            throw Exception(
                name: "E_NO_APP_GROUP_SET",
                description: "No app group name set. Please set AppGroupName in Info.plist")
        }

        guard isScreensharingEnabled == false else {
            DispatchQueue.main.async {
                RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
            }
            return
        }
        guard
            let simulcastConfig = try getSimulcastConfigFromOptions(
                simulcastConfig: screencastOptions.simulcastConfig)
        else {
            return
        }
        screencastSimulcastConfig = simulcastConfig
        screencastMaxBandwidth = getMaxBandwidthFromOptions(
            maxBandwidth: screencastOptions.maxBandwidth)
        let screencastMetadata = screencastOptions.screencastMetadata.toMetadata()
        let videoParameters = getScreencastVideoParameters(screencastOptions: screencastOptions)
        localScreencastTrack = membraneRTC?.createScreencastTrack(
            appGroup: appGroupName,
            videoParameters: videoParameters,
            metadata: screencastMetadata,
            onStart: { [weak self] screencastTrack in
                guard let self = self else {
                    DispatchQueue.main.async {
                        RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
                    }
                    return
                }
                do {
                    guard let screencastTrack = localScreencastTrack else { return }
                    try addTrackToLocalEndpoint(screencastTrack, screencastMetadata)
                    try setScreencastTrackState(isEnabled: true)
                } catch {
                    os_log(
                        "Error starting screencast: %{public}s", log: log, type: .error,
                        String(describing: error))
                }

            },
            onStop: { [weak self] in
                guard let self = self else {
                    return
                }
                do {
                    guard let screencastTrack = localScreencastTrack else { return }
                    try removeTrackFromLocalEndpoint(screencastTrack)
                    localScreencastTrack = nil
                    try setScreencastTrackState(isEnabled: false)
                } catch {
                    os_log(
                        "Error stopping screencast: %{public}s", log: log, type: .error,
                        String(describing: error))
                }
            })
        DispatchQueue.main.async {
            RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
        }
    }

    func getEndpoints() -> [[String: Any]] {
        MembraneRoom.sharedInstance.endpoints.values.sorted(by: { $0.order < $1.order }).map {
            (p) -> Dictionary in
            let videoTracks = p.videoTracks.keys.map { trackId in
                var data = [
                    "id": trackId,
                    "type": "Video",
                    "metadata": p.tracksMetadata[trackId]?.toDict() ?? [:],
                    "encoding": tracksContexts[trackId]?.encoding?.description as Any,
                    "encodingReason": tracksContexts[trackId]?.encodingReason?.rawValue as Any,
                ]
                
                if let simulcast = tracksContexts[trackId]?.simulcastConfig{
                    let simulcastConfig = [
                        "enabled": simulcast.enabled,
                        "activeEncodings": simulcast.activeEncodings.map({ encoding in
                            encoding.description
                        })
                    ]
                    
                    data["simulcastConfig"] = simulcastConfig
                }
                
                return data
            }

            let audioTracks = p.audioTracks.keys.map { trackId in
                [
                    "id": trackId,
                    "type": "Audio",
                    "metadata": p.tracksMetadata[trackId]?.toDict() ?? [:],
                    "vadStatus": tracksContexts[trackId]?.vadStatus.rawValue as Any,
                ]
            }

            return [
                "id": p.id,
                "metadata": p.metadata.toDict(),
                "tracks": videoTracks + audioTracks,
                "isLocal": p.id == localEndpointId,
                "type": p.type,
            ]
        }
    }

    func getCaptureDevices() -> [[String: Any]] {
        let devices = LocalCameraVideoTrack.getCaptureDevices()
        var rnArray: [[String: Any]] = []
        devices.forEach { device in
            rnArray.append([
                "id": device.uniqueID,
                "name": device.localizedName,
                "isFrontFacing": device.position == .front,
                "isBackFacing": device.position == .back,
            ])
        }
        return rnArray
    }

    func getSimulcastConfigAsRNMap(simulcastConfig: SimulcastConfig) -> [String: Any] {
        return [
            "enabled": simulcastConfig.enabled,
            "activeEncodings": simulcastConfig.activeEncodings.map { e in e.description },
        ]
    }

    func updateEndpointMetadata(metadata: [String: Any]) throws {
        try ensureConnected()
        membraneRTC?.updateEndpointMetadata(metadata: metadata.toMetadata())
    }

    func updateTrackMetadata(trackId: String, metadata: [String: Any]) {
        guard let room = membraneRTC, let endpointId = localEndpointId else {
            return
        }

        room.updateTrackMetadata(trackId: trackId, trackMetadata: metadata.toMetadata())
        MembraneRoom.sharedInstance.endpoints[endpointId]?.tracksMetadata[trackId] =
            metadata.toMetadata()
        emitEndpoints()
    }

    func updateVideoTrackMetadata(metadata: [String: Any]) throws {
        try ensureVideoTrack()
        guard let trackId = localVideoTrack?.trackId() else {
            return
        }

        updateTrackMetadata(trackId: trackId, metadata: metadata)
    }

    func updateAudioTrackMetadata(metadata: [String: Any]) throws {
        try ensureAudioTrack()
        guard let trackId = localAudioTrack?.trackId() else {
            return
        }

        updateTrackMetadata(trackId: trackId, metadata: metadata)
    }

    func updateScreencastTrackMetadata(metadata: [String: Any]) throws {
        try ensureScreencastTrack()
        guard let trackId = localScreencastTrack?.trackId() else {
            return
        }

        updateTrackMetadata(trackId: trackId, metadata: metadata)
    }

    private func toggleTrackEncoding(
        encoding: TrackEncoding, trackId: String, simulcastConfig: SimulcastConfig
    ) -> SimulcastConfig? {
        guard let room = membraneRTC else {
            return nil
        }
        if simulcastConfig.activeEncodings.contains(encoding) {
            room.disableTrackEncoding(trackId: trackId, encoding: encoding)
            return SimulcastConfig(
                enabled: true,
                activeEncodings: simulcastConfig.activeEncodings.filter { e in e != encoding }
            )
        } else {
            room.enableTrackEncoding(trackId: trackId, encoding: encoding)
            return SimulcastConfig(
                enabled: true,
                activeEncodings: simulcastConfig.activeEncodings + [encoding]
            )
        }
    }

    func toggleScreencastTrackEncoding(encoding: String) throws -> [String: Any] {
        try ensureScreencastTrack()
        let trackEncoding = try validateEncoding(encoding: encoding as String)
        guard
            let trackId = localScreencastTrack?.trackId(),
            let simulcastConfig = toggleTrackEncoding(
                encoding: trackEncoding, trackId: trackId, simulcastConfig: screencastSimulcastConfig)
        else {
            throw Exception(
                name: "E_NOT_CONNECTED",
                description: "Client not connected to server yet. Make sure to call connect() first!")
        }
        self.screencastSimulcastConfig = simulcastConfig
        return getSimulcastConfigAsRNMap(simulcastConfig: simulcastConfig)
    }
    func setScreencastTrackBandwidth(bandwidth: Int) throws {
        try ensureScreencastTrack()
        guard let room = membraneRTC, let trackId = localScreencastTrack?.trackId() else {
            return
        }
        room.setTrackBandwidth(trackId: trackId, bandwidth: BandwidthLimit(bandwidth))
    }

    func setScreencastTrackEncodingBandwidth(encoding: String, bandwidth: Int) throws {
        try ensureScreencastTrack()
        let trackEncoding = try validateEncoding(encoding: encoding as String)
        guard let room = membraneRTC, let trackId = localScreencastTrack?.trackId() else {
            return
        }
        room.setEncodingBandwidth(
            trackId: trackId, encoding: trackEncoding.description, bandwidth: BandwidthLimit(bandwidth))
    }

    func setTargetTrackEncoding(trackId: String, encoding: String) throws {
        try ensureConnected()
        guard
            let room = membraneRTC,
            let videoTrack = MembraneRoom.sharedInstance.getVideoTrackById(trackId: trackId as String),
            let trackId = (videoTrack as? RemoteVideoTrack)?.track.trackId
                ?? (videoTrack as? LocalVideoTrack)?.trackId(),
            let globalTrackId = getGlobalTrackId(localTrackId: trackId as String)
        else {
            throw Exception(
                name: "E_INVALID_TRACK_ID", description: "Remote track with id=\(trackId) not found")
        }
        let trackEncoding = try validateEncoding(encoding: encoding as String)
        room.setTargetTrackEncoding(trackId: globalTrackId, encoding: trackEncoding)
    }

    func toggleVideoTrackEncoding(encoding: String) throws -> [String: Any] {
        try ensureVideoTrack()
        let trackEncoding = try validateEncoding(encoding: encoding as String)
        guard
            let trackId = localVideoTrack?.trackId(),
            let simulcastConfig = toggleTrackEncoding(
                encoding: trackEncoding, trackId: trackId, simulcastConfig: videoSimulcastConfig)
        else {
            throw Exception(
                name: "E_NOT_CONNECTED",
                description: "Client not connected to server yet. Make sure to call connect() first!")
        }
        self.videoSimulcastConfig = simulcastConfig
        let eventName = EmitableEvents.SimulcastConfigUpdate
        emitEvent(
            name: eventName,
            data: getSimulcastConfigAsRNMap(simulcastConfig: simulcastConfig))
        return getSimulcastConfigAsRNMap(simulcastConfig: simulcastConfig)
    }

    func setVideoTrackEncodingBandwidth(encoding: String, bandwidth: Int) throws {
        try ensureVideoTrack()
        guard let room = membraneRTC, let trackId = localVideoTrack?.trackId() else {
            return
        }
        room.setEncodingBandwidth(
            trackId: trackId, encoding: encoding as String, bandwidth: BandwidthLimit(bandwidth))
    }

    func setVideoTrackBandwidth(bandwidth: Int) throws {
        try ensureVideoTrack()
        guard let room = membraneRTC, let trackId = localVideoTrack?.trackId() else {
            return
        }
        room.setTrackBandwidth(trackId: trackId, bandwidth: BandwidthLimit(bandwidth))
    }

    func changeWebRTCLoggingSeverity(severity: String) throws {
        switch severity {
        case "verbose":
            membraneRTC?.changeWebRTCLoggingSeverity(severity: .verbose)
        case "info":
            membraneRTC?.changeWebRTCLoggingSeverity(severity: .info)
        case "warning":
            membraneRTC?.changeWebRTCLoggingSeverity(severity: .warning)
        case "error":
            membraneRTC?.changeWebRTCLoggingSeverity(severity: .error)
        case "none":
            membraneRTC?.changeWebRTCLoggingSeverity(severity: .none)
        default:
            throw Exception(
                name: "E_INVALID_SEVERITY_LEVEL", description: "Severity with name=\(severity) not found")
        }
    }

    private func getMapFromStatsObject(obj: RTCInboundStats) -> [String: Any] {
        var res: [String: Any] = [:]
        res["kind"] = obj.kind
        res["jitter"] = obj.jitter
        res["packetsLost"] = obj.packetsLost
        res["packetsReceived"] = obj.packetsReceived
        res["bytesReceived"] = obj.bytesReceived
        res["framesReceived"] = obj.framesReceived
        res["frameWidth"] = obj.frameWidth
        res["frameHeight"] = obj.frameHeight
        res["framesPerSecond"] = obj.framesPerSecond
        res["framesDropped"] = obj.framesDropped

        return res
    }

    private func getMapFromStatsObject(obj: RTCOutboundStats) -> [String: Any] {
        var innerMap: [String: Double] = [:]

        innerMap["bandwidth"] = obj.qualityLimitationDurations?.bandwidth ?? 0.0
        innerMap["cpu"] = obj.qualityLimitationDurations?.cpu ?? 0.0
        innerMap["none"] = obj.qualityLimitationDurations?.none ?? 0.0
        innerMap["other"] = obj.qualityLimitationDurations?.other ?? 0.0

        var res: [String: Any] = [:]
        res["kind"] = obj.kind
        res["rid"] = obj.rid
        res["bytesSent"] = obj.bytesSent
        res["targetBitrate"] = obj.targetBitrate
        res["packetsSent"] = obj.packetsSent
        res["framesEncoded"] = obj.framesEncoded
        res["framesPerSecond"] = obj.framesPerSecond
        res["frameWidth"] = obj.frameWidth
        res["frameHeight"] = obj.frameHeight
        res["qualityLimitationDurations"] = innerMap

        return res
    }

    private func statsToRNMap(stats: [String: RTCStats]?) -> [String: Any] {
        var res: [String: Any] = [:]
        stats?.forEach { pair in
            if let val = pair.value as? RTCOutboundStats {
                res[pair.key] = getMapFromStatsObject(obj: val)
            } else {
                res[pair.key] = getMapFromStatsObject(obj: pair.value as! RTCInboundStats)
            }
        }
        return res
    }

    func getStatistics() -> [String: Any] {
        return statsToRNMap(stats: membraneRTC?.getStats())
    }

    func setAudioSessionMode() {
        guard let localAudioTrack = localAudioTrack else {
            return
        }

        switch self.audioSessionMode {
        case AVAudioSession.Mode.videoChat:
            localAudioTrack.setVideoChatMode()
            break
        case AVAudioSession.Mode.voiceChat:
            localAudioTrack.setVoiceChatMode()
            break
        default:
            localAudioTrack.setVideoChatMode()
            break
        }
    }

    func selectAudioSessionMode(sessionMode: String) throws {
        switch sessionMode {
        case "videoChat":
            self.audioSessionMode = AVAudioSession.Mode.videoChat
            break
        case "voiceChat":
            self.audioSessionMode = AVAudioSession.Mode.voiceChat
            break
        default:
            throw Exception(
                name: "E_MEMBRANE_AUDIO_SESSION",
                description:
                    "Invalid audio session mode: \(sessionMode). Supported modes: videoChat, voiceChat")
        }
        setAudioSessionMode()
    }

    func showAudioRoutePicker() {
        DispatchQueue.main.sync {
            let pickerView = AVRoutePickerView()
            if let button = pickerView.subviews.first(where: { $0 is UIButton }) as? UIButton {
                button.sendActions(for: .touchUpInside)
            }
        }
    }

    func startAudioSwitcher() {
        onRouteChangeNotification()
    }

    func emitEvent(name: String, data: [String: Any]) {
        sendEvent(name, data)
    }

    func emitEndpoints() {
        let eventName = EmitableEvents.EndpointsUpdate
        let EndpointsUpdateMap = [eventName: getEndpoints()]
        emitEvent(name: eventName, data: EndpointsUpdateMap)
    }

    @objc func onRouteChangeNotification() {
        let currentRoute = AVAudioSession.sharedInstance().currentRoute
        let output = currentRoute.outputs[0]
        let deviceType = output.portType
        var deviceTypeString: String = ""

        switch deviceType {
        case .bluetoothA2DP, .bluetoothLE, .bluetoothHFP:
            deviceTypeString = "bluetooth"
            break
        case .builtInSpeaker:
            deviceTypeString = "speaker"
            break
        case .builtInReceiver:
            deviceTypeString = "earpiece"
            break
        case .headphones:
            deviceTypeString = "headphones"
            break
        default:
            deviceTypeString = deviceType.rawValue
        }
        let eventName = EmitableEvents.AudioDeviceUpdate
        emitEvent(
            name: eventName,
            data: [
                eventName: [
                    "selectedDevice": ["name": output.portName, "type": deviceTypeString],
                    "availableDevices": [],
                ]
            ] as [String: [String: Any]])
    }

    func onSendMediaEvent(event: SerializedMediaEvent) {
        let eventName = EmitableEvents.SendMediaEvent
        emitEvent(name: eventName, data: ["event": event])
    }

    func onConnected(endpointId: String, otherEndpoints: [Endpoint]) {
        otherEndpoints.forEach { endpoint in
            MembraneRoom.sharedInstance.endpoints[endpoint.id] = RNEndpoint(
                id: endpoint.id, metadata: endpoint.metadata, type: endpoint.type, tracks: endpoint.tracks ?? [:]
            )
        }

        emitEndpoints()
        if let connectPromise = connectPromise {
            connectPromise.resolve(nil)
        }
        connectPromise = nil
    }

    func onConnectionError(metadata: Any) {
        if let connectPromise = connectPromise {
            connectPromise.reject("E_MEMBRANE_CONNECT", "Failed to connect: \(metadata)")
        }
        connectPromise = nil
    }

    func updateOrAddTrack(ctx: TrackContext) {
        guard var endpoint = MembraneRoom.sharedInstance.endpoints[ctx.endpoint.id] else {
            return
        }
        if let audioTrack = ctx.track as? RemoteAudioTrack {
            let localTrackId = (ctx.track as? RemoteAudioTrack)?.track.trackId
            globalToLocalTrackId[ctx.trackId] = localTrackId
            endpoint.audioTracks[audioTrack.track.trackId] = audioTrack
            endpoint.tracksMetadata[audioTrack.track.trackId] = ctx.metadata
            if let localTrackId = localTrackId,
                tracksContexts[localTrackId] == nil
            {
                tracksContexts[localTrackId] = ctx
                ctx.setOnVoiceActivityChangedListener { ctx in
                    self.emitEndpoints()
                }
            }
        }

        if let videoTrack = ctx.track as? RemoteVideoTrack {
            let localTrackId = (ctx.track as? RemoteVideoTrack)?.track.trackId
            globalToLocalTrackId[ctx.trackId] = localTrackId
            endpoint.videoTracks[videoTrack.track.trackId] = videoTrack
            endpoint.tracksMetadata[videoTrack.track.trackId] = ctx.metadata
            if let localTrackId = localTrackId,
                tracksContexts[localTrackId] == nil
            {
                tracksContexts[localTrackId] = ctx
                ctx.setOnEncodingChangedListener { ctx in
                    self.emitEndpoints()
                }
            }
        }
        MembraneRoom.sharedInstance.endpoints[ctx.endpoint.id] = endpoint
        self.emitEndpoints()
    }

    func onTrackReady(ctx: TrackContext) {
        updateOrAddTrack(ctx: ctx)
    }

    func onTrackAdded(ctx: TrackContext) {

    }

    func onTrackRemoved(ctx: TrackContext) {
        guard var endpoint = MembraneRoom.sharedInstance.endpoints[ctx.endpoint.id] else {
            return
        }
        if let audioTrack = ctx.track as? RemoteAudioTrack {
            endpoint = endpoint.removeTrack(trackId: audioTrack.track.trackId)
        }
        if let videoTrack = ctx.track as? RemoteVideoTrack {
            endpoint = endpoint.removeTrack(trackId: videoTrack.track.trackId)
        }
        globalToLocalTrackId.removeValue(forKey: ctx.trackId)
        MembraneRoom.sharedInstance.endpoints[ctx.endpoint.id] = endpoint
        emitEndpoints()
    }

    func onTrackUpdated(ctx: TrackContext) {
        updateOrAddTrack(ctx: ctx)
    }

    func onEndpointAdded(endpoint: Endpoint) {
        MembraneRoom.sharedInstance.endpoints[endpoint.id] = RNEndpoint(
            id: endpoint.id, metadata: endpoint.metadata, type: endpoint.type)
        emitEndpoints()
    }

    func onEndpointRemoved(endpoint: Endpoint) {
        MembraneRoom.sharedInstance.endpoints.removeValue(forKey: endpoint.id)
        emitEndpoints()
    }

    func onEndpointUpdated(endpoint: Endpoint) {

    }

    func onBandwidthEstimationChanged(estimation: Int) {
        let eventName = EmitableEvents.BandwidthEstimation
        emitEvent(name: eventName, data: [eventName: estimation])
    }

}
