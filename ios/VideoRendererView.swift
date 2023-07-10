import ExpoModulesCore
import MembraneRTC
import Combine

class VideoRendererView: ExpoView {
  var videoView: VideoView? = nil
  var cancellableEndpoints: Cancellable? = nil
  
  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    videoView = VideoView()
    videoView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    videoView?.clipsToBounds = true
    addSubview(videoView!)
    cancellableEndpoints = MembraneRoom.sharedInstance.$endpoints
      .sink { [weak self] _ in
        self?.updateVideoTrack()
      }
  }
  
  func updateVideoTrack() {
    DispatchQueue.main.async {
      let newTrack = MembraneRoom.sharedInstance.getVideoTrackById(trackId: self.trackId)
      if(newTrack != self.videoView?.track) {
        self.videoView?.track = newTrack
      }
    }
  }
  
  var trackId: String = "" {
    didSet {
      updateVideoTrack()
    }
  }
  
  var videoLayout: String = "FILL" {
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
  
  var mirrorVideo: Bool = false {
    didSet {
      self.videoView?.mirror = mirrorVideo
    }
  }
}
