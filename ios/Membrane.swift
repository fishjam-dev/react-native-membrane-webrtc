import MembraneRTC
import React
import ReplayKit


#if os(iOS)
@available(iOS 12, *)
public extension RPSystemBroadcastPickerView {
  static func show(for preferredExtension: String? = nil, showsMicrophoneButton: Bool = false) {
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

public extension NSDictionary {
  func toMetadata() -> Metadata {
    var res: Metadata = .init()
    self.forEach { entry in
      if let key = entry.key as? String {
        res[key] = entry.value
      }
    }
    return res
  }
}

public extension AnyJson {
  func toDict() -> [String: Any] {
    var res: [String: Any] = [:]
    self.keys.forEach { key in
        res[key] = self[key]
    }
    return res
  }
}

extension String: Error {}

public extension String {
  func toTrackEncoding() -> TrackEncoding? {
    switch(self) {
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

struct Participant {
  let id: String
  let metadata: Metadata
  let order: Int
  var videoTrackMetadata: Metadata?
  var audioTrackMetadata: Metadata?
  
  static var participantCounter = 0
  
  init(id: String, metadata: Metadata, videoTrackMetadata: Metadata? = nil,
       audioTrackMetadata: Metadata? = nil) {
    self.id = id
    self.metadata = metadata
    self.order = Participant.participantCounter
    self.videoTrackMetadata = videoTrackMetadata
    self.audioTrackMetadata = audioTrackMetadata
    Participant.participantCounter += 1
  }
}

class ParticipantVideo: Identifiable, ObservableObject {
  let id: String
  let participant: Participant
  
  @Published var videoTrack: VideoTrack
  var mirror: Bool
  
  init(id: String, participant: Participant, videoTrack: VideoTrack, mirror: Bool = false) {
    self.id = id
    self.participant = participant
    self.videoTrack = videoTrack
    self.mirror = mirror
  }
}

extension LocalAudioTrack{
    public func trackId() -> String {
        return track.trackId
    }
}

@objc(Membrane)
class Membrane: RCTEventEmitter, MembraneRTCDelegate {
  var localVideoTrack: LocalVideoTrack?
  var localAudioTrack: LocalAudioTrack?
  var localScreencastTrack: LocalScreenBroadcastTrack?
  var localUserMetadata: Metadata = .init()
  var videoTrackMetadata: Metadata = .init()
  var audioTrackMetadata: Metadata = .init()
  
  var errorMessage: String?
  var isMicEnabled: Bool = true
  var isCameraEnabled: Bool = true
  var isScreensharingEnabled: Bool = false
  
  
  var localParticipantId: String?
  var localScreensharingVideoId: String?
  var localScreensharingParticipantId: String?
  var isFrontCamera: Bool = true
  
  var room: MembraneRTC? = nil;
  var connectResolve: RCTPromiseResolveBlock? = nil
  var connectReject: RCTPromiseRejectBlock? = nil
  var joinResolve: RCTPromiseResolveBlock? = nil
  var joinReject: RCTPromiseRejectBlock? = nil
  var videoQuality: String? = nil
  var flipVideo: Bool = true
  var videoSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var videoBandwidthLimit: TrackBandwidthLimit = .BandwidthLimit(0)
  var screenshareSimulcastConfig: SimulcastConfig = SimulcastConfig()
  var screenshareBandwidthLimit: TrackBandwidthLimit = .BandwidthLimit(0)
  
  @objc static override func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  private func getSimulcastConfigFrom(options: NSDictionary) -> SimulcastConfig {
    let simulcastConfig = options["simulcastConfig"] as? NSDictionary ?? [:]
    var activeEncodings: [TrackEncoding] = []
    (simulcastConfig["activeEncodings"] as? [String] ?? []).forEach {
      e in activeEncodings.append(e.toTrackEncoding()!)
    }
    return SimulcastConfig(
      enabled: simulcastConfig["enabled"] as? Bool ?? false,
      activeEncodings: activeEncodings
    )
  }
  
  private func getBandwidthLimitFrom(options: NSDictionary) -> TrackBandwidthLimit {
    let maxBandwidth = options["maxBandwidth"]
    if(maxBandwidth == nil) {
      return .BandwidthLimit(0)
    } else if(maxBandwidth as? NSDictionary != nil) {
      return .SimulcastBandwidthLimit(maxBandwidth as! SimulcastBandwidthLimit)
    } else {
      return .BandwidthLimit(maxBandwidth as! Int)
    }
  }
  
    @objc(connect:withRoomName:withConnectionOptions:withResolver:withRejecter:)
    func connect(url: String, roomName: String, connectionOptions: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    connectResolve = resolve
    connectReject = reject
    self.videoQuality = connectionOptions["quality"] as? String ?? ""
    self.flipVideo = connectionOptions["flipVideo"] as? Bool ?? true
    self.localUserMetadata = (connectionOptions["userMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    self.videoTrackMetadata = (connectionOptions["videoTrackMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    self.audioTrackMetadata = (connectionOptions["audioTrackMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
        
    let socketConnectionParams = (connectionOptions["connectionParams"] as? NSDictionary)?.toMetadata() ?? Metadata()
      
    self.videoSimulcastConfig = getSimulcastConfigFrom(options: connectionOptions)
    self.videoBandwidthLimit = getBandwidthLimitFrom(options: connectionOptions)
        
    room = MembraneRTC.connect(
      with: MembraneRTC.ConnectOptions(
        transport: PhoenixTransport(url: url, topic: "room:\(roomName)", params: socketConnectionParams.toDict()),
        config: self.localUserMetadata
      ),
      delegate: self
    )
  }
  
  @objc(join:withRejecter:)
  func join(resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
    joinResolve = resolve
    joinReject = reject
    room?.join()
  }
  
  @objc(disconnect:withRejecter:)
  func disconnect(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    room?.remove(delegate: self)
    room?.disconnect()
    room = nil
    MembraneRoom.sharedInstance.participants = [:]
    MembraneRoom.sharedInstance.participantVideos = []
    resolve(nil)
  }
  
  @objc(toggleScreencast:withResolver:withRejecter:)
  func toggleScreencast(screencastOptions: NSDictionary, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    let screencastExtensionBundleId = Bundle.main.infoDictionary!["ScreencastExtensionBundleId"] as? String
    let appGroupName = Bundle.main.infoDictionary!["AppGroupName"] as? String
    guard let screencastExtensionBundleId = screencastExtensionBundleId,
          let appGroupName = appGroupName else {
            fatalError("ScreencastExtensionBundleId or AppGroupName not set")
          }
    
    // if screensharing is enabled it must be closed by the Broadcast Extension, not by our application
    // the only thing we can do is to display stop recording button, which we already do
    guard isScreensharingEnabled == false else {
      DispatchQueue.main.async {
        RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
      }
      resolve(nil)
      return
    }
    guard let room = room else {
        return
    }
    
    let preset: VideoParameters = {
      switch(screencastOptions["quality"] as? String) {
        case "VGA":
          return VideoParameters.presetScreenShareVGA
        case "HD5":
          return VideoParameters.presetScreenShareHD5
        case "HD15":
          return VideoParameters.presetScreenShareHD15
        case "FHD15":
          return VideoParameters.presetScreenShareFHD15
        case "FHD30":
          return VideoParameters.presetScreenShareFHD30
        default:
          return VideoParameters.presetScreenShareHD15
      }
    }()
    screenshareSimulcastConfig = getSimulcastConfigFrom(options: screencastOptions)
    screenshareBandwidthLimit = getBandwidthLimitFrom(options: screencastOptions)
    let videoParameters = VideoParameters(
      dimensions: preset.dimensions.flip(),
      maxBandwidth: screenshareBandwidthLimit,
      maxFps: preset.maxFps,
      simulcastConfig: screenshareSimulcastConfig
    )
    
    var screencastMetadata = (screencastOptions["screencastMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    screencastMetadata["type"] = "screensharing"
    
      self.localScreencastTrack = room.createScreencastTrack(appGroup: appGroupName, videoParameters: videoParameters, metadata: screencastMetadata, onStart: { [weak self] screencastTrack in
      guard let self = self else {
        DispatchQueue.main.async {
          RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
        }
        return
      }
      
      self.localScreensharingVideoId = UUID().uuidString
      self.localScreensharingParticipantId = UUID().uuidString
      guard let localScreensharingParticipantId = self.localScreensharingParticipantId else { return }
      let localScreensharingParticipant = Participant(id: localScreensharingParticipantId, metadata: screencastMetadata)
      MembraneRoom.sharedInstance.participants[localScreensharingParticipantId] = localScreensharingParticipant
    
      let localParticipantScreensharing = ParticipantVideo(
        id: self.localScreensharingVideoId!,
        participant: localScreensharingParticipant,
        videoTrack: screencastTrack
      )
      
      self.add(video: localParticipantScreensharing)
      self.isScreensharingEnabled = true
      self.emitEvent(name: "IsScreencastOn", data: true)
      self.emitParticipants()
    }, onStop: { [weak self] in
      guard let self = self,
            let localScreensharingId = self.localScreensharingVideoId,
            let video = self.findParticipantVideo(id: localScreensharingId),
            let localScreensharingParticipantId = self.localScreensharingParticipantId
      else {
        return
      }
      
      self.remove(video: video)
      MembraneRoom.sharedInstance.participants.removeValue(forKey: localScreensharingParticipantId)
      
      self.isScreensharingEnabled = false
      self.emitEvent(name: "IsScreencastOn", data: false)
      self.emitParticipants()
    })
    DispatchQueue.main.async {
      RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
    }
    resolve(nil)
  }
  
  func getParticipantsForRN() -> Dictionary<String, Array<Dictionary<String, Any>>> {
    return ["participants": MembraneRoom.sharedInstance.participants.values.sorted(by: {$0.order < $1.order}).map {
      (p) -> Dictionary in
      var participantType = ""
      if (p.id == localParticipantId) {
          participantType = "Local"
      } else if (p.id == localScreensharingParticipantId) {
        participantType = "LocalScreencasting"
      } else {
        participantType = "Remote"
      }
        
      return [
        "id": p.id,
        "metadata": p.metadata.toDict(),
        "videoTrackMetadata": p.videoTrackMetadata?.toDict() ?? [:],
        "audioTrackMetadata": p.audioTrackMetadata?.toDict() ?? [:],
        "type": participantType
      ]
    }]
  }
  
  func getSimulcastConfigAsRNMap(simulcastConfig: SimulcastConfig) -> [String: Any] {
    return [
      "enabled": simulcastConfig.enabled,
      "activeEncodings": simulcastConfig.activeEncodings.map { e in e.description },
    ]
  }
  
  @objc(getParticipants:withRejecter:)
  func getParticipants(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(getParticipantsForRN())
  }
  
  @objc(toggleCamera:withRejecter:)
  func toggleCamera(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    isCameraEnabled = !isCameraEnabled
    localVideoTrack?.setEnabled(isCameraEnabled)
    resolve(isCameraEnabled)
  }
  
  @objc(isCameraOn:withRejecter:)
  func isCameraOn(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(isCameraEnabled)
  }
  
  @objc(toggleMicrophone:withRejecter:)
  func toggleMicrophone(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    isMicEnabled = !isMicEnabled
    localAudioTrack?.setEnabled(isMicEnabled)
    resolve(isMicEnabled)
  }
  
  @objc(isMicrophoneOn:withRejecter:)
  func isMicrophoneOn(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(isMicEnabled)
  }
  
  @objc(flipCamera:withRejecter:)
  func flipCamera(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard let cameraTrack = localVideoTrack as? LocalCameraVideoTrack else {
        return
    }

    cameraTrack.switchCamera()
    isFrontCamera = !isFrontCamera
    
    guard let id = localParticipantId,
          let localVideo = findParticipantVideo(id: id) else {
              return
    }
    
    let localIsFrontCamera = isFrontCamera
    // HACK: there is a delay when we set the mirror and the camer actually switches
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
        localVideo.mirror = localIsFrontCamera
    }
    resolve(nil)
  }
    
    @objc(updatePeerMetadata:withResolver:withRejecter:)
    func updatePeerMetadata(metadata:NSDictionary, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        room?.updatePeerMetadata(peerMetadata: metadata.toMetadata())
        resolve(nil)
    }
    
    @objc(updateVideoTrackMetadata:withResolver:withRejecter:)
    func updateVideoTrackMetadata(metadata:NSDictionary, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        guard let room = room, let trackId = localVideoTrack?.trackId(), let peerId = localParticipantId else {
            return
        }

        room.updateTrackMetadata(trackId: trackId, trackMetadata: metadata.toMetadata())
        MembraneRoom.sharedInstance.participants[peerId]?.videoTrackMetadata = metadata.toMetadata()
        emitParticipants()
        resolve(nil)
    }
    
    @objc(updateAudioTrackMetadata:withResolver:withRejecter:)
    func updateAudioTrackMetadata(metadata:NSDictionary, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        guard let room = room, let trackId = localAudioTrack?.trackId(), let peerId = localParticipantId else {
            return
        }

        room.updateTrackMetadata(trackId: trackId, trackMetadata: metadata.toMetadata())
        MembraneRoom.sharedInstance.participants[peerId]?.audioTrackMetadata = metadata.toMetadata()
        emitParticipants()
        resolve(nil)
    }
    
    @objc(updateScreencastTrackMetadata:withResolver:withRejecter:)
    func updateScreencastTrackMetadata(metadata:NSDictionary, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        guard let room = room, let trackId = localScreencastTrack?.trackId() else {
            return
        }

        room.updateTrackMetadata(trackId: trackId, trackMetadata: metadata.toMetadata())
        MembraneRoom.sharedInstance.participants[trackId]?.audioTrackMetadata = metadata.toMetadata()
        emitParticipants()
        resolve(nil)
    }
  
  private func toggleTrackEncoding(encoding: String, trackId: String, simulcastConfig: SimulcastConfig) -> SimulcastConfig? {
    guard let room = room, let trackEncoding = (encoding as String).toTrackEncoding() else {
      return nil
    }
    if(simulcastConfig.activeEncodings.contains(trackEncoding)) {
      room.disableTrackEncoding(trackId: trackId, encoding: trackEncoding)
      return SimulcastConfig(
        enabled: true,
        activeEncodings: simulcastConfig.activeEncodings.filter { e in e != trackEncoding}
      )
    } else {
      room.enableTrackEncoding(trackId: trackId, encoding: trackEncoding)
      return SimulcastConfig(
        enabled: true,
        activeEncodings: simulcastConfig.activeEncodings + [trackEncoding]
      )
    }
  }
  
  @objc(toggleScreencastTrackEncoding:withResolver:withRejecter:)
  func toggleScreencastTrackEncoding(encoding: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard
      let trackId = localScreencastTrack?.trackId(),
      let simulcastConfig = toggleTrackEncoding(encoding: encoding as String, trackId: trackId, simulcastConfig: screenshareSimulcastConfig) else {
      return
    }
    self.screenshareSimulcastConfig = simulcastConfig
    resolve(getSimulcastConfigAsRNMap(simulcastConfig: simulcastConfig))
  }
  
  @objc(setScreencastTrackBandwidth:withResolver:withRejecter:)
  func setScreencastTrackBandwidth(bandwidth: NSNumber, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard let room = room, let trackId = localScreencastTrack?.trackId() else {
      return
    }
    room.setTrackBandwidth(trackId: trackId, bandwidth: BandwidthLimit(truncating: bandwidth))
    resolve(nil)
  }
  
  @objc(setScreencastTrackEncodingBandwidth:withBandwidth:withResolver:withRejecter:)
  func setScreencastTrackEncodingBandwidth(encoding: NSString, bandwidth: NSNumber, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard let room = room, let trackId = localScreencastTrack?.trackId() else {
      return
    }
    room.setEncodingBandwidth(trackId: trackId, encoding: encoding as String, bandwidth: BandwidthLimit(truncating: bandwidth))
    resolve(nil)
  }
  
  @objc(setTargetTrackEncoding:withEncoding:withResolver:withRejecter:)
  func setTargetTrackEncoding(peerId: NSString, encoding: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard
      let room = room,
      let trackId = MembraneRoom.sharedInstance.participantVideos.first(where: { $0.participant.id == peerId as String })?.id,
      let trackEncoding = (encoding as String).toTrackEncoding()
    else {
      return
    }
    room.setTargetTrackEncoding(trackId: trackId, encoding: trackEncoding)
    resolve(nil)
  }
  
  @objc(toggleVideoTrackEncoding:withResolver:withRejecter:)
  func toggleVideoTrackEncoding(encoding: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard
      let trackId = localVideoTrack?.trackId(),
      let simulcastConfig = toggleTrackEncoding(encoding: encoding as String, trackId: trackId, simulcastConfig: videoSimulcastConfig) else {
      return
    }
    self.videoSimulcastConfig = simulcastConfig
    resolve(getSimulcastConfigAsRNMap(simulcastConfig: simulcastConfig))
  }
  
  @objc(setVideoTrackEncodingBandwidth:withBandwidth:withResolver:withRejecter:)
  func setVideoTrackEncodingBandwidth(encoding: NSString, bandwidth: NSNumber, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    guard let room = room, let trackId = localVideoTrack?.trackId() else {
      return
    }
    room.setEncodingBandwidth(trackId: trackId, encoding: encoding as String, bandwidth: BandwidthLimit(truncating: bandwidth))
    resolve(nil)
  }
  
  @objc(setVideoTrackBandwidth:withResolver:withRejecter:)
  func setVideoTrackBandwidth(bandwidth: NSNumber, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    guard let room = room, let trackId = localVideoTrack?.trackId() else {
      return
    }
    room.setTrackBandwidth(trackId: trackId, bandwidth: BandwidthLimit(truncating: bandwidth))
  }
  
  override func supportedEvents() -> [String]! {
    return [
      "ParticipantsUpdate",
      "MembraneError",
      "IsMicrophoneOn",
      "IsCameraOn",
      "IsScreencastOn",
    ]
  }
  
  func emitEvent(name: String, data: Any?) -> Void {
    sendEvent(withName: name, body: data)
  }
  
  func emitParticipants() -> Void {
    emitEvent(name: "ParticipantsUpdate", data: getParticipantsForRN())
  }
  
  func findParticipantVideo(id: String) -> ParticipantVideo? {
    return MembraneRoom.sharedInstance.participantVideos.first(where: { $0.id == id })
  }
  
  func add(video: ParticipantVideo) {
    guard findParticipantVideo(id: video.id) == nil else {
      print("RoomController tried to add already existing ParticipantVideo")
      return
    }
    
    MembraneRoom.sharedInstance.participantVideos.append(video)
    emitParticipants()
  }
  
  func remove(video: ParticipantVideo) {
    guard let idx = MembraneRoom.sharedInstance.participantVideos.firstIndex(where: { $0.id == video.id }) else {
      return
    }
    
    MembraneRoom.sharedInstance.participantVideos.remove(at: idx)
    emitParticipants()
  }
  
  func onConnected() {
    guard let room = room else {
      return
    }
    
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
      maxBandwidth: self.videoBandwidthLimit,
      simulcastConfig: self.videoSimulcastConfig
    )
    
    localVideoTrack = room.createVideoTrack(videoParameters: videoParameters, metadata: videoTrackMetadata)
    localAudioTrack = room.createAudioTrack(metadata: audioTrackMetadata)
    
    if let connectResolve = connectResolve {
      connectResolve(nil)
    }
  }
  
  func onJoinSuccess(peerID: String, peersInRoom: [Peer]) {
    localParticipantId = peerID
    
    let localParticipant = Participant(
      id: peerID,
      metadata: localUserMetadata,
      videoTrackMetadata: videoTrackMetadata,
      audioTrackMetadata: audioTrackMetadata
    )
    
    let participants = peersInRoom.map { peer in
      Participant(id: peer.id, metadata: peer.metadata)
    }
    
    MembraneRoom.sharedInstance.participants[localParticipant.id] = localParticipant
    guard let videoTrack = self.localVideoTrack else {
      fatalError("failed to setup local video")
    }
    add(video: ParticipantVideo(id: localParticipant.id, participant: localParticipant, videoTrack: videoTrack, mirror: self.isFrontCamera))
    participants.forEach { participant in MembraneRoom.sharedInstance.participants[participant.id] = participant }
    
    emitParticipants()
    if let joinResolve = joinResolve {
      joinResolve(nil)
    }
    joinResolve = nil
    joinReject = nil
  }
  
  func onJoinError(metadata: Any) {
    if let joinReject = joinReject {
      joinReject("E_MEMBRANE_JOIN", "Failed to join room: \(metadata)", nil)
    }
    joinResolve = nil
    joinReject = nil
  }
  
  func onTrackReady(ctx: TrackContext) {
    if ctx.track is AudioTrack {
      MembraneRoom.sharedInstance.participants[ctx.peer.id]?.audioTrackMetadata = ctx.metadata
      return
    }
    
    guard let participant = MembraneRoom.sharedInstance.participants[ctx.peer.id],
          let videoTrack = ctx.track as? VideoTrack
    else {
      return
    }
    
    // there can be a situation where we simply need to replace `videoTrack` for
    // already existing video, happens when dynamically adding new local track
    if let participantVideo = MembraneRoom.sharedInstance.participantVideos.first(where: { $0.id == ctx.trackId }) {
      DispatchQueue.main.async {
        participantVideo.videoTrack = videoTrack
      }
      
      return
    }
    
    if ctx.metadata["type"] as? String == "screensharing" {
      // add a fake screencasting participant
      let screensharingParticipant = Participant(id: ctx.trackId, metadata: ctx.metadata, videoTrackMetadata: ctx.metadata)
      MembraneRoom.sharedInstance.participants[screensharingParticipant.id] = screensharingParticipant
      let video = ParticipantVideo(
        id: ctx.trackId,
        participant: screensharingParticipant,
        videoTrack: videoTrack
      )
      add(video: video)
    } else {
      let video = ParticipantVideo(
        id: ctx.trackId,
        participant: participant,
        videoTrack: videoTrack
      )
      add(video: video)
      MembraneRoom.sharedInstance.participants[ctx.peer.id]?.videoTrackMetadata = ctx.metadata
    }
    emitParticipants()
  }
  
  func onTrackAdded(ctx: TrackContext) {
    
  }
  
  func onTrackRemoved(ctx: TrackContext) {
    if (ctx.metadata["type"] as? String == "screensharing") {
      if let video = MembraneRoom.sharedInstance.participantVideos.first(where: { $0.id == ctx.trackId }) {
        MembraneRoom.sharedInstance.participants.removeValue(forKey: video.participant.id)
        remove(video: video)
      }
    }
    if let video = MembraneRoom.sharedInstance.participantVideos.first(where: { $0.id == ctx.trackId }) {
      remove(video: video)
    }
    emitParticipants()
  }
  
  func onTrackUpdated(ctx: TrackContext) {
    if ctx.track is AudioTrack {
      MembraneRoom.sharedInstance.participants[ctx.peer.id]?.audioTrackMetadata = ctx.metadata
    } else if (ctx.metadata["type"] as? String == "screensharing") {
      MembraneRoom.sharedInstance.participants[ctx.trackId]?.videoTrackMetadata = ctx.metadata
    } else {
      MembraneRoom.sharedInstance.participants[ctx.peer.id]?.videoTrackMetadata = ctx.metadata
    }
    self.emitParticipants()
  }
  
  func onPeerJoined(peer: Peer) {
    MembraneRoom.sharedInstance.participants[peer.id] = Participant(id: peer.id, metadata: peer.metadata)
    emitParticipants()
  }
  
  func onPeerLeft(peer: Peer) {
    MembraneRoom.sharedInstance.participants.removeValue(forKey: peer.id)
    emitParticipants()
  }
  
  func onPeerUpdated(peer: Peer) {
    
  }
  
  func onError(_ error: MembraneRTCError) {
    if let joinReject = joinReject {
      joinReject("E_MEMBRANE_JOIN", "Failed to join room: \(error)", nil)
    }
    if let connectReject = connectReject {
      connectReject("E_MEMBRANE_CONNECT", "Failed to connect: \(error)", nil)
    }
    joinReject = nil
    joinResolve = nil
    connectReject = nil
    connectResolve = nil
    var errorMessage: String? = nil
    switch error {
    case let .rtc(message):
        errorMessage = message

    case let .transport(message):
        errorMessage = message

    case let .unknown(message):
        errorMessage = message
    }
    emitEvent(name: "MembraneError", data: errorMessage)
  }
  
}
