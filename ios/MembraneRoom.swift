import MembraneRTC

class MembraneRoom: NSObject {
  static let sharedInstance = MembraneRoom()
  private override init() {}
  
  @Published var endpoints: [String:RNEndpoint] = [:]
  
  func getVideoTrackById(trackId: String) -> VideoTrack? {
    let videoTracks = endpoints.values.map { p in p.videoTracks.values }.joined()
    return videoTracks.first(where: {($0 as? RemoteVideoTrack)?.track.trackId == trackId || ($0 as? LocalVideoTrack)?.trackId() == trackId})
  }
}
