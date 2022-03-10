package org.membraneframework.rtc.media

import android.app.Notification
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjection
import org.membraneframework.rtc.media.screencast.ScreencastServiceConnector
import org.webrtc.*
import java.util.*

/**
 * A class representing a local screencast track.
 * <p>
 * It is responsible for managing an instance of <strong>ScreenCapturerAndroid</strong>
 * that is responsible for capturing the entire device's screen and passing it to the WebRTC
 * <strong>VideoTrack</strong>.
 */
class LocalScreencastTrack
constructor(
    mediaTrack: org.webrtc.VideoTrack,
    context: Context,
    eglBase: EglBase,
    private val capturer: ScreenCapturerAndroid,
    private val videoParameters: VideoParameters,
    callback: ProjectionCallback
): VideoTrack(mediaTrack, eglBase.eglBaseContext), LocalTrack{
    private val screencastConnection = ScreencastServiceConnector(context)

    init {
        callback.addCallback { stop() }
    }

    suspend fun startForegroundService(notificationId: Int?, notification: Notification?) {
        screencastConnection.connect()
        screencastConnection.start(notificationId, notification)
    }

    override fun start() {
        capturer.startCapture(videoParameters.dimensions.width, videoParameters.dimensions.height, videoParameters.encoding.maxFps)
    }

    override fun stop() {
        screencastConnection.stop()
        capturer.stopCapture()
    }

    override fun enabled(): Boolean {
        return videoTrack.enabled()
    }

    override fun setEnabled(enabled: Boolean) {
        videoTrack.setEnabled(enabled)
    }

    /*
        MediaProjection callback wrapper holding several callbacks that
        will be invoked once the media projections stops.
    */
    class ProjectionCallback: MediaProjection.Callback() {
        var callbacks: ArrayList<() -> Unit> = arrayListOf()

        override fun onStop() {
            callbacks.forEach {
                it.invoke()
            }

            callbacks.clear()
        }

        fun addCallback(callback: () -> Unit) {
            callbacks.add(callback)
        }
    }

    companion object {
        /**
         * Creates a screencast track.
         *
         * @param context: context of the current application
         * @param factory: an instance of <strong>PeerConnectionFactory</strong> used for creating video sources and tracks
         * @param eglBase: an instance of <strong>EglBase</strong> used for rendering the video
         */
        fun create(context: Context, factory: PeerConnectionFactory, eglBase: EglBase, mediaProjectionPermission: Intent, videoParameters: VideoParameters, onStopped: (track: LocalScreencastTrack) -> Unit): LocalScreencastTrack {
            val source = factory.createVideoSource(true)
            val track = factory.createVideoTrack(UUID.randomUUID().toString(), source)

            val callback = ProjectionCallback()


            val capturer = ScreenCapturerAndroid(mediaProjectionPermission, callback)

            capturer.initialize(
                SurfaceTextureHelper.create("ScreenVideoCaptureThread", eglBase.eglBaseContext),
                context,
                source.capturerObserver
            )

            val localScreencastTrack = LocalScreencastTrack(track, context, eglBase, capturer, videoParameters, callback)
            callback.addCallback {
                onStopped(localScreencastTrack)
            }

            return localScreencastTrack
        }
    }
}
