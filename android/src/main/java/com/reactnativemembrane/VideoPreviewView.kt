import org.membraneframework.rtc.media.LocalVideoTrack
import org.membraneframework.rtc.ui.VideoTextureViewRenderer
import org.webrtc.PeerConnectionFactory
import android.content.Context
import org.membraneframework.rtc.media.VideoParameters
import org.webrtc.EglBase

class VideoPreviewView(private val context: Context) {
  var view: VideoTextureViewRenderer = VideoTextureViewRenderer(context)
  private lateinit var localVideoTrack: LocalVideoTrack
  private lateinit var eglBase: EglBase
  private lateinit var peerConnectionFactory: PeerConnectionFactory

  fun init() {
    PeerConnectionFactory.initialize(PeerConnectionFactory.InitializationOptions.builder(context).createInitializationOptions())
    eglBase = EglBase.create()
    peerConnectionFactory = PeerConnectionFactory.builder().createPeerConnectionFactory()

    localVideoTrack = LocalVideoTrack.create(context, peerConnectionFactory, eglBase, VideoParameters.presetFHD169).also {
      it.start()
    }
    view.init(eglBase.eglBaseContext, null)
    localVideoTrack.addRenderer(view)
  }

  fun dispose() {
    localVideoTrack.removeRenderer(view)
    localVideoTrack.stop()
    localVideoTrack.rtcTrack().dispose()
    view.release()
    peerConnectionFactory.dispose()
    eglBase.release()
  }
}
