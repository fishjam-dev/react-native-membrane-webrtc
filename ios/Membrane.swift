import MembraneRTC

@objc(Membrane)
class Membrane: NSObject, MembraneRTCDelegate {
  func onConnected() {
    print("CONNECTED!")
  }
  
  func onJoinSuccess(peerID: String, peersInRoom: [Peer]) {
    
  }
  
  func onJoinError(metadata: Any) {
    
  }
  
  func onTrackReady(ctx: TrackContext) {
    
  }
  
  func onTrackAdded(ctx: TrackContext) {
    
  }
  
  func onTrackRemoved(ctx: TrackContext) {
    
  }
  
  func onTrackUpdated(ctx: TrackContext) {
    
  }
  
  func onPeerJoined(peer: Peer) {
    
  }
  
  func onPeerLeft(peer: Peer) {
    
  }
  
  func onPeerUpdated(peer: Peer) {
    
  }
  
  func onError(_ error: MembraneRTCError) {
    
  }
  

  @objc(connect:withRoomName:withDisplayName:withResolver:withRejecter:)
  func connect(url: String, roomName: String, displayName: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      let client = MembraneRTC.connect(
          with: MembraneRTC.ConnectOptions(
              transport: PhoenixTransport(url: url, topic: "room:\(roomName)"),
              config: ["displayName": displayName]
          ),
          delegate: self
      )
    }
}
