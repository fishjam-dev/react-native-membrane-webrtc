package com.reactnativemembrane

import org.membraneframework.rtc.media.LocalVideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.PeerConnectionFactory
import android.content.Context
import org.membraneframework.rtc.media.VideoParameters
import org.webrtc.EglBase

class VideoPreviewView(private val context: Context): VideoTextureViewRenderer(context) {
  private var localVideoTrack: LocalVideoTrack? = null
  private var eglBase: EglBase? = null
  private var peerConnectionFactory: PeerConnectionFactory? = null
  private var isInitialized: Boolean = false

  private var captureDeviceId: String? = null

  private fun initialize() {
    if(isInitialized) return
    isInitialized = true
    PeerConnectionFactory.initialize(PeerConnectionFactory.InitializationOptions.builder(context).createInitializationOptions())
    val eglBase = EglBase.create()
    this.eglBase = eglBase
    val peerConnectionFactory = PeerConnectionFactory.builder().createPeerConnectionFactory()
    this.peerConnectionFactory = peerConnectionFactory

    localVideoTrack = LocalVideoTrack.create(context, peerConnectionFactory, eglBase, VideoParameters.presetFHD169).also {
      it.start()
    }
    init(eglBase.eglBaseContext, null)
    localVideoTrack?.addRenderer(this)
  }

  fun switchCamera(captureDeviceId: String) {
    this.captureDeviceId = captureDeviceId
    localVideoTrack?.switchCamera(captureDeviceId)
  }

  private fun dispose() {
    localVideoTrack?.removeRenderer(this)
    localVideoTrack?.stop()
    localVideoTrack?.rtcTrack()?.dispose()
    this.release()
    peerConnectionFactory?.dispose()
    eglBase?.release()
    isInitialized = false
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    dispose()
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    initialize()
  }
}
