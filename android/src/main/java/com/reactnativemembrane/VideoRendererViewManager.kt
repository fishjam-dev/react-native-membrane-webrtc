package com.reactnativemembrane
import android.graphics.Color
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer

class VideoRendererViewManager : SimpleViewManager<View>() {
  override fun getName() = "VideoRendererView"

  var activeVideoTrack: VideoTrack? = null
  var isInitialized = false

  fun setupTrack(videoTrack: VideoTrack, view: VideoTextureViewRenderer) {
    if (activeVideoTrack == videoTrack) return

    activeVideoTrack?.removeRenderer(view)
    videoTrack.addRenderer(view)
    activeVideoTrack = videoTrack
  }

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    return VideoTextureViewRenderer(reactContext)
  }

  @ReactProp(name = "participantId")
  fun setParticipantId(view: VideoTextureViewRenderer, participantId: String) {
    val participant = MembraneRoom.participants[participantId] ?: return
    if(participant.videoTrack == null) return;
    // create a new video renderer view class that has isInitialized property?
    //if(!isInitialized) {
      //isInitialized = true
      view.init(participant.videoTrack.eglContext, null)

    //}
    setupTrack(participant.videoTrack, view)
  }
}
