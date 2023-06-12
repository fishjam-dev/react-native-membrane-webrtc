import MembraneRTC

struct RNEndpoint {
  let id: String
  let metadata: Metadata
  let type: String
  let order: Int
  var tracksMetadata: [String:Metadata]
  var videoTracks: [String:VideoTrack]
  var audioTracks: [String:AudioTrack]
  
  static var endpointCounter = 0
  
  init(
    id: String,
    metadata: Metadata,
    type: String,
    videoTracks: [String:VideoTrack] = [:],
    audioTracks: [String:AudioTrack] = [:],
    tracksMetadata: [String:Metadata] = [:]
  ) {
    self.id = id
    self.metadata = metadata
    self.type = type
    self.order = RNEndpoint.endpointCounter
    self.videoTracks = videoTracks
    self.audioTracks = audioTracks
    self.tracksMetadata = tracksMetadata
    RNEndpoint.endpointCounter += 1
  }
  
  func removeTrack(trackId: String) -> RNEndpoint {
    var newEndpoint = self
    newEndpoint.videoTracks.removeValue(forKey: trackId)
    newEndpoint.audioTracks.removeValue(forKey: trackId)
    newEndpoint.tracksMetadata.removeValue(forKey: trackId)
    return newEndpoint
  }
}
