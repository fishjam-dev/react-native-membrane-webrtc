package com.reactnativemembrane

import android.content.Context
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.membraneframework.rtc.media.LocalVideoTrack
import org.webrtc.PeerConnectionFactory
import org.membraneframework.rtc.media.VideoParameters
import org.webrtc.EglBase
import org.webrtc.RendererCommon

class VideoPreviewView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private var localVideoTrack: LocalVideoTrack? = null
    private var eglBase: EglBase? = null
    private var peerConnectionFactory: PeerConnectionFactory? = null
    private var isInitialized: Boolean = false

    private var captureDeviceId: String? = null

    private val videoView = VideoTextureViewRenderer(context).also {
        addView(it)
    }

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
        videoView.init(eglBase.eglBaseContext, null)
        localVideoTrack?.addRenderer(videoView)
    }

    fun switchCamera(captureDeviceId: String) {
        this.captureDeviceId = captureDeviceId
        localVideoTrack?.switchCamera(captureDeviceId)
    }

    fun setVideoLayout(videoLayout: String) {
        val scalingType = when (videoLayout) {
            "FILL" -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
            "FIT" -> RendererCommon.ScalingType.SCALE_ASPECT_FIT
            else -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
        }
        videoView.setScalingType(scalingType)
        videoView.setEnableHardwareScaler(true)
    }

    fun setMirrorVideo(mirrorVideo: Boolean) {
        videoView.setMirror(mirrorVideo)
    }

    private fun dispose() {
        localVideoTrack?.removeRenderer(videoView)
        localVideoTrack?.stop()
        localVideoTrack?.rtcTrack()?.dispose()
        videoView.release()
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