package org.membraneframework.reactnative

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class VideoPreviewViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("VideoPreviewViewModule")

        View(VideoPreviewView::class) {
            Prop("videoLayout") { view: VideoPreviewView, videoLayout: String ->
                view.setVideoLayout(videoLayout)
            }

            Prop("mirrorVideo") { view: VideoPreviewView, mirrorVideo: Boolean ->
                view.setMirrorVideo(mirrorVideo)
            }

            Prop("captureDeviceId") { view: VideoPreviewView, captureDeviceId: String ->
                view.switchCamera(captureDeviceId)
            }
        }
    }
}