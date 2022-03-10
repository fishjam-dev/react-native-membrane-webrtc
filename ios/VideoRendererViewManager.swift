import MembraneRTC
import UIKit
import Combine

@objc(VideoRendererViewManager)
class VideoRendererViewManager: RCTViewManager {
  
  override func view() -> (VideoRendererView) {
    return VideoRendererView()
  }
}

class VideoRendererView : UIView {
  var videoView: VideoView? = nil
  var cancellableParticipantVideos: Cancellable? = nil
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    videoView = VideoView()
    videoView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(videoView!)
    cancellableParticipantVideos = MembraneRoom.sharedInstance.$participantVideos
      .sink { _ in
        self.updateVideoTrack()
      }
  }
  
  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func updateVideoTrack() {
    DispatchQueue.main.async {
      let video = MembraneRoom.sharedInstance.participantVideos.first(where: {$0.participant.id == self.participantId})
      self.videoView?.track = video?.videoTrack
    }
  }
  
  @objc var participantId: String = "" {
    didSet {
      updateVideoTrack()
    }
  }
  
  @objc var videoLayout: String = "FILL" {
    didSet {
      switch(videoLayout) {
      case "FIT":
        self.videoView?.layout = .fit
      case "FILL":
        self.videoView?.layout = .fill
      default:
        self.videoView?.layout = .fill
      }
      
    }
  }
}
