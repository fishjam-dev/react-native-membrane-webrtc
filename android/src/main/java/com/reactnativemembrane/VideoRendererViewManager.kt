package com.reactnativemembrane
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.RendererCommon

class VideoRendererViewManager : SimpleViewManager<View>() {
  override fun getName() = "VideoRendererView"

  private val views = ArrayList<VideoRendererView>()

  init {
    MembraneModule.onTracksUpdate = {
      views.forEach { it.update() }
    }
  }

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    val view = VideoRendererView(reactContext)
    views.add(view)
    return view
  }

  override fun onDropViewInstance(view: View) {
    (view as VideoRendererView).dispose()
    views.remove(view)
  }

  @ReactProp(name = "trackId")
  fun setParticipantId(view: VideoRendererView, trackId: String) {
    view.init(trackId)
  }

  @ReactProp(name = "videoLayout")
  fun setVideoLayout(view: VideoRendererView, videoLayout: String) {
    val scalingType = when (videoLayout) {
      "FILL" -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
      "FIT" -> RendererCommon.ScalingType.SCALE_ASPECT_FIT
      else -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
    }
    view.setScalingType(scalingType)
    view.setEnableHardwareScaler(true)
  }

  @ReactProp(name = "mirrorVideo")
  fun setMirrorVideo(view: VideoRendererView, mirror: Boolean) {
    view.setMirror(mirror)
  }
}
