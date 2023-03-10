import MembraneRTC
import UIKit
import Combine

@objc(VideoPreviewViewManager)
class VideoPreviewViewManager: RCTViewManager {
  override func view() -> (VideoPreviewView) {
    return VideoPreviewView()
  }
  
  @objc static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}

class VideoPreviewView : UIView {
  var videoView: VideoView? = nil
  private var localVideoTrack: LocalVideoTrack? = nil
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    videoView = VideoView()
    videoView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(videoView!)
   
    localVideoTrack = LocalVideoTrack.create(videoParameters: VideoParameters.presetFHD169)
    localVideoTrack?.start()
    videoView?.track = localVideoTrack
  }
  
  override func removeFromSuperview() {
    localVideoTrack?.stop()
  }
  
  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
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
