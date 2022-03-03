package com.reactnativemembrane
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import org.membraneframework.rtc.ui.VideoTextureViewRenderer

class VideoRendererViewManager : SimpleViewManager<View>() {
  override fun getName() = "VideoRendererView"

  private val viewsWrappers = HashMap<VideoTextureViewRenderer, VideoRendererWrapper>();

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    val wrapper = VideoRendererWrapper(reactContext)
    viewsWrappers[wrapper.view] = wrapper
    return wrapper.view
  }

  override fun onDropViewInstance(view: View) {
    viewsWrappers[view]?.dispose()
    viewsWrappers.remove(view)
  }

  @ReactProp(name = "participantId")
  fun setParticipantId(view: VideoTextureViewRenderer, participantId: String) {
    viewsWrappers[view]?.init(participantId)
  }
}
