package com.reactnativemembrane

import android.content.Context
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer

class VideoRendererView(context: Context): VideoTextureViewRenderer(context) {
  var isInitialized = false
  var activeVideoTrack: VideoTrack? = null
  var trackId: String? = null

  private fun setupTrack(videoTrack: VideoTrack) {
    if (activeVideoTrack == videoTrack) return

    activeVideoTrack?.removeRenderer(this)
    videoTrack.addRenderer(this)
    activeVideoTrack = videoTrack
  }

  fun update() {
    CoroutineScope(Dispatchers.Main).launch {
      val endpoint = MembraneModule.endpoints.values.firstOrNull { it.videoTracks[trackId] != null }
      val videoTrack = endpoint?.videoTracks?.get(trackId) ?: return@launch
      if(!isInitialized) {
        isInitialized = true
        this@VideoRendererView.init(videoTrack.eglContext, null)
      }
      setupTrack(videoTrack)
    }
  }

  fun init(trackId: String) {
    this.trackId = trackId
    update()
  }

  fun dispose() {
    activeVideoTrack?.removeRenderer(this)
    this.release()
  }
}
