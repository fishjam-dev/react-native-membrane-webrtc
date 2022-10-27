import MembraneRTC

struct Participant {
  let id: String
  let metadata: Metadata
  let order: Int
  var tracksMetadata: [String:Metadata]
  var videoTracks: [String:VideoTrack]
  var audioTracks: [String:AudioTrack]
  
  static var participantCounter = 0
  
  init(
    id: String,
    metadata: Metadata,
    videoTracks: [String:VideoTrack] = [:],
    audioTracks: [String:AudioTrack] = [:],
    tracksMetadata: [String:Metadata] = [:]
  ) {
    self.id = id
    self.metadata = metadata
    self.order = Participant.participantCounter
    self.videoTracks = videoTracks
    self.audioTracks = audioTracks
    self.tracksMetadata = tracksMetadata
    Participant.participantCounter += 1
  }
  
  func removeVideoTrack(trackId: String) -> Participant {
    var newParticipant = self
    newParticipant.videoTracks.removeValue(forKey: trackId)
    newParticipant.tracksMetadata.removeValue(forKey: trackId)
    return newParticipant
  }
  
  func removeAudioTrack(trackId: String) -> Participant {
    var newParticipant = self
    newParticipant.audioTracks.removeValue(forKey: trackId)
    newParticipant.tracksMetadata.removeValue(forKey: trackId)
    return newParticipant
  }
}
