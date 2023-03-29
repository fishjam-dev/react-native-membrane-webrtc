package com.reactnativemembrane

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.reactnativemembrane.VideoPreviewView
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.RendererCommon

class VideoPreviewViewManager : SimpleViewManager<View>() {
  override fun getName() = "com.reactnativemembrane.VideoPreviewView"

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    return VideoPreviewView(reactContext)
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
  fun setMirrorVideo(view: VideoPreviewView, mirror: Boolean) {
    view.setMirror(mirror)
  }

  @ReactProp(name = "captureDeviceId")
  fun setCaptureDeviceId(view: VideoPreviewView, captureDeviceId: String) {
    view.switchCamera(captureDeviceId)
  }
}
