class MembraneRoom: NSObject {
  static let sharedInstance = MembraneRoom()
  private override init() {}
  
  var participants: [String: Participant] = [:]
  @Published var participantVideos: [ParticipantVideo] = []
  
}
