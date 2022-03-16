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
    var res: Metadata = [:]
    self.forEach { entry in
      if let key = entry.key as? String, let value = entry.value as? String {
        res[key] = value
      }
    }
    return res
  }
}

struct Participant {
  let id: String
  let metadata: Metadata
  let order: Int
  
  static var participantCounter = 0
  
  init(id: String, metadata: Metadata) {
    self.id = id
    self.metadata = metadata
    self.order = Participant.participantCounter
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

@objc(Membrane)
class Membrane: RCTEventEmitter, MembraneRTCDelegate {
  var localVideoTrack: LocalVideoTrack?
  var localAudioTrack: LocalAudioTrack?
  var localScreencastTrack: LocalScreenBroadcastTrack?
  var localUserMetadata: Metadata = [:]
  var videoTrackMetadata: Metadata = [:]
  var audioTrackMetadata: Metadata = [:]
  
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
  
  @objc static override func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  @objc(connect:withRoomName:withConnectionOptions:withResolver:withRejecter:)
  func connect(url: String, roomName: String, connectionOptions: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    connectResolve = resolve
    connectReject = reject
    self.videoQuality = connectionOptions["videoQuality"] as? String ?? ""
    self.flipVideo = connectionOptions["flipVideo"] as? Bool ?? true
    self.localUserMetadata = (connectionOptions["userMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    self.videoTrackMetadata = (connectionOptions["videoTrackMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    self.audioTrackMetadata = (connectionOptions["audioTrackMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    room = MembraneRTC.connect(
      with: MembraneRTC.ConnectOptions(
        transport: PhoenixTransport(url: url, topic: "room:\(roomName)"),
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
    let videoParameters = VideoParameters(dimensions: preset.dimensions.flip(), encoding: preset.encoding)
    
    var screencastMetadata = (screencastOptions["screencastMetadata"] as? NSDictionary)?.toMetadata() ?? Metadata()
    screencastMetadata["type"] = "screensharing"
    
    room.createScreencastTrack(appGroup: appGroupName, videoParameters: videoParameters, metadata: screencastMetadata, onStart: { [weak self] screencastTrack in
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
        "metadata": p.metadata,
        "type": participantType
      ]
    }]
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
    let videoParameters = VideoParameters(dimensions: flipVideo ? preset.dimensions.flip() : preset.dimensions, encoding: preset.encoding)
    
    localVideoTrack = room.createVideoTrack(videoParameters: videoParameters, metadata: videoTrackMetadata)
    localAudioTrack = room.createAudioTrack(metadata: audioTrackMetadata)
    
    if let connectResolve = connectResolve {
      connectResolve(nil)
    }
  }
  
  func onJoinSuccess(peerID: String, peersInRoom: [Peer]) {
    localParticipantId = peerID
    
    let localParticipant = Participant(id: peerID, metadata: localUserMetadata)
    
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
    
    if ctx.metadata["type"] == "screensharing" {
      // add a fake screencasting participant
      let screensharingParticipant = Participant(id: ctx.trackId, metadata: ctx.metadata)
      MembraneRoom.sharedInstance.participants[screensharingParticipant.id] = screensharingParticipant
      let video = ParticipantVideo(id: ctx.trackId, participant: screensharingParticipant, videoTrack: videoTrack)
      add(video: video)
    } else {
      let video = ParticipantVideo(id: ctx.trackId, participant: participant, videoTrack: videoTrack)
      add(video: video)
    }
    emitParticipants()
  }
  
  func onTrackAdded(ctx: TrackContext) {
    
  }
  
  func onTrackRemoved(ctx: TrackContext) {
    if (ctx.metadata["type"] == "screensharing") {
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
