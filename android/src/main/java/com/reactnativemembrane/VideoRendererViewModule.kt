package com.reactnativemembrane

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class VideoRendererViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("VideoRendererViewModule")

        View(VideoRendererView::class) {

            OnViewDestroys { view: VideoRendererView ->
                view.dispose()
            }

            Prop("trackId") { view: VideoRendererView, trackId: String ->
                view.init(trackId)
            }

            Prop("videoLayout") { view: VideoRendererView, videoLayout: String ->
                view.setVideoLayout(videoLayout)
            }

            Prop("mirrorVideo") { view: VideoRendererView, mirrorVideo: Boolean ->
                view.setMirrorVideo(mirrorVideo)
            }
        }
    }
}