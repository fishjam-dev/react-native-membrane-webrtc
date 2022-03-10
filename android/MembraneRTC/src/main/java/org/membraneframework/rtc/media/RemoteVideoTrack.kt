package org.membraneframework.rtc.media

import org.webrtc.EglBase

public class RemoteVideoTrack(
    mediaTrack: org.webrtc.VideoTrack,
    eglBase: EglBase,
) : VideoTrack(mediaTrack, eglBase.eglBaseContext), RemoteTrack {
    override fun enabled(): Boolean {
        return this.videoTrack.enabled()
    }

    override fun setEnabled(enabled: Boolean) {
        this.videoTrack.setEnabled(enabled)
    }

}