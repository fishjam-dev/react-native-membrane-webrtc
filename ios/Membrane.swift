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

struct Participant {
  let id: String
  let displayName: String
  
  init(id: String, displayName: String) {
    self.id = id
    self.displayName = displayName
  }
}

class ParticipantVideo: Identifiable, ObservableObject {
  let id: String
  let participant: Participant
  let isScreensharing: Bool
  
  @Published var videoTrack: VideoTrack
  var mirror: Bool
  
  init(id: String, participant: Participant, videoTrack: VideoTrack, isScreensharing: Bool = false, mirror: Bool = false) {
    self.id = id
    self.participant = participant
    self.videoTrack = videoTrack
    self.isScreensharing = isScreensharing
    self.mirror = mirror
  }
}

@objc(Membrane)
class Membrane: RCTEventEmitter, MembraneRTCDelegate {
  var localVideoTrack: LocalVideoTrack?
  var localAudioTrack: LocalAudioTrack?
  var localScreencastTrack: LocalScreenBroadcastTrack?
  
  var errorMessage: String?
  var isMicEnabled: Bool = true
  var isCameraEnabled: Bool = true
  var isScreensharingEnabled: Bool = false
  
  
  var localParticipantId: String?
  var localScreensharingVideoId: String?
  var isFrontCamera: Bool = true
  
  var room: MembraneRTC? = nil;
  var connectResolve: RCTPromiseResolveBlock? = nil
  var connectReject: RCTPromiseRejectBlock? = nil
  var joinResolve: RCTPromiseResolveBlock? = nil
  var joinReject: RCTPromiseRejectBlock? = nil
  
  
  @objc(connect:withRoomName:withDisplayName:withResolver:withRejecter:)
  func connect(url: String, roomName: String, displayName: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    connectResolve = resolve
    connectReject = reject
    room = MembraneRTC.connect(
      with: MembraneRTC.ConnectOptions(
        transport: PhoenixTransport(url: url, topic: "room:\(roomName)"),
        config: ["displayName": displayName]
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
  
  @objc(toggleScreencast:withRejecter:)
  func toggleScreencast(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
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
    guard let room = room,
          let localParticipantId = localParticipantId,
          let localParticipant = MembraneRoom.sharedInstance.participants[localParticipantId] else {
            return
          }
    
    
    let displayName = room.currentPeer().metadata["displayName"] ?? "UNKNOWN"
    
    let preset = VideoParameters.presetScreenShareHD15
    let videoParameters = VideoParameters(dimensions: preset.dimensions.flip(), encoding: preset.encoding)
    
    room.createScreencastTrack(appGroup: appGroupName, videoParameters: videoParameters, metadata: ["user_id": displayName, "type": "screensharing"], onStart: { [weak self] screencastTrack in
      guard let self = self else {
        DispatchQueue.main.async {
          RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
        }
        return
      }
      
      self.localScreensharingVideoId = UUID().uuidString
      
      let localParticipantScreensharing = ParticipantVideo(
        id: self.localScreensharingVideoId!,
        participant: localParticipant,
        videoTrack: screencastTrack,
        isScreensharing: true
      )
      
      self.add(video: localParticipantScreensharing)
      self.isScreensharingEnabled = true
      self.emitEvent(name: "IsScreencastOn", data: true)
    }, onStop: { [weak self] in
      guard let self = self,
            let localScreensharingId = self.localScreensharingVideoId,
            let video = self.findParticipantVideo(id: localScreensharingId)
      else {
        return
      }
      
      self.remove(video: video)
      self.isScreensharingEnabled = false
      self.emitEvent(name: "IsScreencastOn", data: false)
    })
    DispatchQueue.main.async {
      RPSystemBroadcastPickerView.show(for: screencastExtensionBundleId)
    }
    resolve(nil)
  }
  
  func getParticipantsForRN() -> Dictionary<String, Array<Dictionary<String, String>>> {
    return ["participants": MembraneRoom.sharedInstance.participants.values.map {
      (p) -> Dictionary in
      return ["id": p.id, "displayName": p.displayName]
    }]
  }
  
  @objc(getParticipants:withRejecter:)
  func getParticipants(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(getParticipantsForRN())
  }
  
  @objc(isCameraOn:withRejecter:)
  func isCameraOn(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(true)
  }
  
  @objc(isMicrophoneOn:withRejecter:)
  func isMicrophoneOn(resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(true)
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
    
    let localPeer = room.currentPeer()
    let trackMetadata = ["user_id": localPeer.metadata["displayName"] ?? "UNKNOWN"]
    
    let preset = VideoParameters.presetVGA169
    let videoParameters = VideoParameters(dimensions: preset.dimensions.flip(), encoding: preset.encoding)
    
    localVideoTrack = room.createVideoTrack(videoParameters: videoParameters, metadata: trackMetadata)
    localAudioTrack = nil //room.createAudioTrack(metadata: trackMetadata)
    
    if let connectResolve = connectResolve {
      connectResolve(nil)
    }
  }
  
  func onJoinSuccess(peerID: String, peersInRoom: [Peer]) {
    localParticipantId = peerID
    
    let localParticipant = Participant(id: peerID, displayName: "Me")
    
    let participants = peersInRoom.map { peer in
      Participant(id: peer.id, displayName: peer.metadata["displayName"] ?? "")
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
  }
  
  func onJoinError(metadata: Any) {
    
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
    
    // track is seen for the first time so initialize the participant's video
    let isScreensharing = ctx.metadata["type"] == "screensharing"
    let video = ParticipantVideo(id: ctx.trackId, participant: participant, videoTrack: videoTrack, isScreensharing: isScreensharing)
    
    add(video: video)
    emitParticipants()
  }
  
  func onTrackAdded(ctx: TrackContext) {
    
  }
  
  func onTrackRemoved(ctx: TrackContext) {
    if let video = MembraneRoom.sharedInstance.participantVideos.first(where: { $0.id == ctx.trackId }) {
      remove(video: video)
    }
    emitParticipants()
  }
  
  func onTrackUpdated(ctx: TrackContext) {
    
  }
  
  func onPeerJoined(peer: Peer) {
    MembraneRoom.sharedInstance.participants[peer.id] = Participant(id: peer.id, displayName: peer.metadata["displayName"] ?? "")
    emitParticipants()
  }
  
  func onPeerLeft(peer: Peer) {
    MembraneRoom.sharedInstance.participants.removeValue(forKey: peer.id)
    emitParticipants()
  }
  
  func onPeerUpdated(peer: Peer) {
    
  }
  
  func onError(_ error: MembraneRTCError) {
    print("ERROR")
  }
  
}
