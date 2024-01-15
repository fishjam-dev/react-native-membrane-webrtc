import MembraneRTC

struct RNTrack{
    let metadata: Metadata
    let simulcastConfig: SimulcastConfig
}

struct RNEndpoint {
    let id: String
    var metadata: Metadata
    let type: String
    let order: Int
    var tracksMetadata: [String: Metadata]
    var videoTracks: [String: VideoTrack]
    var audioTracks: [String: AudioTrack]
    var tracks: [String: TracksAddedEvent.Data.TrackData]

    static var endpointCounter = 0

    init(
        id: String,
        metadata: Metadata,
        type: String,
        videoTracks: [String: VideoTrack] = [:],
        audioTracks: [String: AudioTrack] = [:],
        tracksMetadata: [String: Metadata] = [:],
        tracks: [String: TracksAddedEvent.Data.TrackData] = [:]
    ) {
        self.id = id
        self.metadata = metadata
        self.type = type
        self.order = RNEndpoint.endpointCounter
        self.videoTracks = videoTracks
        self.audioTracks = audioTracks
        self.tracksMetadata = tracksMetadata
        self.tracks = tracks
        RNEndpoint.endpointCounter += 1
    }

    func removeTrack(trackId: String) -> RNEndpoint {
        var newEndpoint = self
        newEndpoint.videoTracks.removeValue(forKey: trackId)
        newEndpoint.audioTracks.removeValue(forKey: trackId)
        newEndpoint.tracksMetadata.removeValue(forKey: trackId)
        newEndpoint.tracks.removeValue(forKey: trackId)
        return newEndpoint
    }
}
