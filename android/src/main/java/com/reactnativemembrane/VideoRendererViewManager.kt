package com.reactnativemembrane
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.RendererCommon

class VideoRendererViewManager : SimpleViewManager<View>() {
  override fun getName() = "VideoRendererView"

  private val viewsWrappers = HashMap<VideoTextureViewRenderer, VideoRendererWrapper>();

  init {
    MembraneRoom.roomObserver = {
      viewsWrappers.values.forEach { it.update() }
    }
  }

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

  @ReactProp(name = "videoLayout")
  fun setVideoLayout(view: VideoTextureViewRenderer, videoLayout: String) {
    val scalingType = when (videoLayout) {
      "FILL" -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
      "FIT" -> RendererCommon.ScalingType.SCALE_ASPECT_FIT
      else -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
    }
    view.setScalingType(scalingType)
    view.setEnableHardwareScaler(true)
  }
}
