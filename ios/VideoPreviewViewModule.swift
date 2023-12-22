import ExpoModulesCore

public class VideoPreviewViewModule: Module {
    public func definition() -> ModuleDefinition {
        Name("VideoPreviewViewModule")

        View(VideoPreviewView.self) {
            Prop("captureDeviceId") { (view: VideoPreviewView, prop: String) in
                view.captureDeviceId = prop
            }

            Prop("mirrorVideo") { (view: VideoPreviewView, prop: Bool) in
                view.mirrorVideo = prop
            }

            Prop("videoLayout") { (view: VideoPreviewView, prop: String) in
                view.videoLayout = prop
            }
        }
    }
}
