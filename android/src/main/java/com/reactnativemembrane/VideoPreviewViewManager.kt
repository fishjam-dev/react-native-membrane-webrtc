import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.RendererCommon

class VideoPreviewViewManager : SimpleViewManager<View>() {
  override fun getName() = "VideoPreviewView"

  private val viewsWrappers = HashMap<VideoTextureViewRenderer, VideoPreviewView>()

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    val wrapper = VideoPreviewView(reactContext)
    wrapper.init()
    viewsWrappers[wrapper.view] = wrapper
    return wrapper.view
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

  @ReactProp(name = "mirrorVideo")
  fun setMirrorVideo(view: VideoTextureViewRenderer, mirror: Boolean) {
    view.setMirror(mirror)
  }

  override fun onDropViewInstance(view: View) {
    viewsWrappers[view]?.dispose()
    viewsWrappers.remove(view)
  }
}
