package org.membraneframework.rtc.media

import android.content.Context
import org.webrtc.*
import java.util.*

/**
 * A class representing a local video track.
 *
 * Internally it wraps a WebRTC <strong>VideoTrack</strong>.
 */
class LocalVideoTrack
constructor(
    mediaTrack: org.webrtc.VideoTrack,
    private val capturer: Capturer,
    eglBase: EglBase
): VideoTrack(mediaTrack, eglBase.eglBaseContext), LocalTrack {
    companion object {
        fun create(context: Context, factory: PeerConnectionFactory, eglBase: EglBase, videoParameters: VideoParameters): LocalVideoTrack {
            val source = factory.createVideoSource(false)
            val track = factory.createVideoTrack(UUID.randomUUID().toString(), source)


            val capturer = CameraCapturer(
                context = context,
                source = source,
                rootEglBase = eglBase,
                videoParameters = videoParameters
            )

            return LocalVideoTrack(track, capturer, eglBase)
        }
    }

    override fun start() {
        capturer.startCapture()
    }

    override fun stop() {
        capturer.stopCapture()
    }

    override fun enabled(): Boolean {
        return videoTrack.enabled()
    }

    override fun setEnabled(enabled: Boolean) {
        videoTrack.setEnabled(enabled)
    }

    fun flipCamera() {
        (capturer as? CameraCapturer)?.flipCamera()
    }
}

interface Capturer {
    fun capturer(): VideoCapturer
    fun startCapture()
    fun stopCapture()

}

class CameraCapturer constructor(
    private val context: Context,
    private val source: VideoSource,
    private val rootEglBase: EglBase,
    private val videoParameters: VideoParameters,
): Capturer, CameraVideoCapturer.CameraSwitchHandler {
    private lateinit var cameraCapturer: CameraVideoCapturer
    private lateinit var size: Size
    private var frontFacing = true
    private var isCapturing = false

    init {
        createCapturer()
    }

    override fun capturer(): VideoCapturer {
        return cameraCapturer
    }

    override fun startCapture() {
        isCapturing = true
        cameraCapturer.startCapture(size.height, size.width, videoParameters.encoding.maxFps)
    }

    override fun stopCapture() {
        isCapturing = false
        cameraCapturer.stopCapture()
        cameraCapturer.dispose()
    }

    fun flipCamera() {
        cameraCapturer.switchCamera(this)
    }

    private fun createCapturer() {
        val enumerator = if (Camera2Enumerator.isSupported(context)) {
            Camera2Enumerator(context)
        } else {
            Camera1Enumerator(true)
        }

        for (deviceName in enumerator.deviceNames) {
            if (enumerator.isFrontFacing(deviceName)) {
                this.cameraCapturer = enumerator.createCapturer(deviceName, null)


                this.cameraCapturer.initialize(
                    SurfaceTextureHelper.create("CameraCaptureThread", rootEglBase.eglBaseContext),
                    context,
                    source.capturerObserver
                )

                val sizes = enumerator.getSupportedFormats(deviceName)
                    ?.map { Size(it.width, it.height)}
                    ?: emptyList()

                this.size = CameraEnumerationAndroid.getClosestSupportedSize(sizes, videoParameters.dimensions.height, videoParameters.dimensions.width)

                break
            }
        }
    }

    override fun onCameraSwitchDone(isFrontCamera: Boolean) {
        frontFacing = isFrontCamera
    }

    override fun onCameraSwitchError(errorDescription: String?) {
        // FIXME do nothing for now
    }
}
