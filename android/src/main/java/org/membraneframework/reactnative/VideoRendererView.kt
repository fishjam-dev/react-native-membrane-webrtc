package org.membraneframework.reactnative

import android.content.Context
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.RendererCommon

class VideoRendererView(context: Context, appContext: AppContext) : ExpoView(context, appContext),
    MembraneWebRTC.OnTrackUpdateListener {
    var isInitialized = false
    var activeVideoTrack: VideoTrack? = null
    var trackId: String? = null

    private val videoView = VideoTextureViewRenderer(context).also {
        addView(it)
        MembraneWebRTC.onTracksUpdateListeners.add(this)
    }

    private fun setupTrack(videoTrack: VideoTrack) {
        if (activeVideoTrack == videoTrack) return

        activeVideoTrack?.removeRenderer(videoView)
        videoTrack.addRenderer(videoView)
        activeVideoTrack = videoTrack
    }

    private fun update() {
        CoroutineScope(Dispatchers.Main).launch {
            val endpoint = MembraneWebRTC.endpoints.values.firstOrNull { it.videoTracks[trackId] != null }
            val videoTrack = endpoint?.videoTracks?.get(trackId) ?: return@launch
            if(!isInitialized) {
                isInitialized = true
                videoView.init(videoTrack.eglContext, null)
            }
            setupTrack(videoTrack)
        }
    }

    fun init(trackId: String) {
        this.trackId = trackId
        update()
    }

    fun dispose() {
        activeVideoTrack?.removeRenderer(videoView)
        videoView.release()
        MembraneWebRTC.onTracksUpdateListeners.remove(this)
    }

    override fun onTracksUpdate() {
        update()
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

}