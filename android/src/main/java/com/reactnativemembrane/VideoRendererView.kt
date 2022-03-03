package com.reactnativemembrane

import android.content.Context
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer

class VideoRendererWrapper(context: Context) {
  var view: VideoTextureViewRenderer = VideoTextureViewRenderer(context)
  var isInitialized = false
  var activeVideoTrack: VideoTrack? = null

  fun setupTrack(videoTrack: VideoTrack) {
    if (activeVideoTrack == videoTrack) return

    activeVideoTrack?.removeRenderer(view)
    videoTrack.addRenderer(view)
    activeVideoTrack = videoTrack
  }

  fun init(participantId: String) {
    val participant = MembraneRoom.participants[participantId] ?: return
    if(participant.videoTrack == null) return;
    if(!isInitialized) {
      isInitialized = true
      view.init(participant.videoTrack.eglContext, null)
    }
    setupTrack(participant.videoTrack)
  }

  fun dispose() {
    activeVideoTrack?.removeRenderer(view)
    view.release()
  }

}
