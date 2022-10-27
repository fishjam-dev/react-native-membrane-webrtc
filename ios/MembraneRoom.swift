import MembraneRTC

class MembraneRoom: NSObject {
  static let sharedInstance = MembraneRoom()
  private override init() {}
  
  @Published var participants: [String:Participant] = [:]
  
  func getVideoTrackById(trackId: String) -> VideoTrack? {
    let videoTracks = participants.values.map { p in p.videoTracks.values }.joined()
    return videoTracks.first(where: {($0 as? RemoteVideoTrack)?.track.trackId == trackId || ($0 as? LocalVideoTrack)?.trackId() == trackId})
  }
}
