package com.reactnativemembrane

import android.content.Context
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer

class VideoRendererWrapper(context: Context) {
  var view: VideoTextureViewRenderer = VideoTextureViewRenderer(context)
  var isInitialized = false
  var activeVideoTrack: VideoTrack? = null
  var participantId: String? = null

  fun setupTrack(videoTrack: VideoTrack) {
    if (activeVideoTrack == videoTrack) return

    activeVideoTrack?.removeRenderer(view)
    videoTrack.addRenderer(view)
    activeVideoTrack = videoTrack
  }

  fun update() {
    CoroutineScope(Dispatchers.Main).launch {
      val participant = MembraneModule.participants[participantId] ?: return@launch
      if(participant.videoTrack == null) return@launch;
      if(!isInitialized) {
        isInitialized = true
        view.init(participant.videoTrack.eglContext, null)
      }
      setupTrack(participant.videoTrack)
    }
  }

  fun init(participantId: String) {
    this.participantId = participantId
    update()
  }

  fun dispose() {
    activeVideoTrack?.removeRenderer(view)
    view.release()
  }

}
