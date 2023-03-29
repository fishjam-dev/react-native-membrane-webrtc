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
  private var localVideoTrack: LocalCameraVideoTrack? = nil
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    videoView = VideoView()
    videoView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    videoView?.clipsToBounds = true
    addSubview(videoView!)
   
    localVideoTrack = LocalVideoTrack.create(videoParameters: VideoParameters.presetFHD169) as? LocalCameraVideoTrack
    videoView?.track = localVideoTrack
  }
  
  override func willMove(toWindow newWindow: UIWindow?) {
    if(newWindow == nil) {
      localVideoTrack?.stop()
    } else {
      localVideoTrack?.start()
    }
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
  
  @objc var mirrorVideo: Bool = false {
    didSet {
      self.videoView?.mirror = mirrorVideo
    }
  }
  
  @objc var captureDeviceId: String? = nil {
    didSet {
      if let captureDeviceId = captureDeviceId {
        localVideoTrack?.switchCamera(deviceId: captureDeviceId)
      }
    }
  }
}
