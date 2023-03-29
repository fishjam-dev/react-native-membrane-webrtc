package com.reactnativemembrane

import org.membraneframework.rtc.media.LocalVideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.PeerConnectionFactory
import android.content.Context
import org.membraneframework.rtc.media.VideoParameters
import org.webrtc.EglBase

class VideoPreviewView(private val context: Context): VideoTextureViewRenderer(context) {
  private lateinit var localVideoTrack: LocalVideoTrack
  private lateinit var eglBase: EglBase
  private lateinit var peerConnectionFactory: PeerConnectionFactory

  fun switchCamera(captureDeviceId: String) {
    localVideoTrack.switchCamera(captureDeviceId)
  }

  private fun dispose() {
    localVideoTrack.removeRenderer(this)
    localVideoTrack.stop()
    localVideoTrack.rtcTrack().dispose()
    this.release()
    peerConnectionFactory.dispose()
    eglBase.release()
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    dispose()
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    PeerConnectionFactory.initialize(PeerConnectionFactory.InitializationOptions.builder(context).createInitializationOptions())
    eglBase = EglBase.create()
    peerConnectionFactory = PeerConnectionFactory.builder().createPeerConnectionFactory()

    localVideoTrack = LocalVideoTrack.create(context, peerConnectionFactory, eglBase, VideoParameters.presetFHD169).also {
      it.start()
    }
    init(eglBase.eglBaseContext, null)
    localVideoTrack.addRenderer(this)
  }
}
