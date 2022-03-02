package org.membraneframework.rtc.media

public class RemoteAudioTrack constructor(
    mediaTrack: org.webrtc.AudioTrack

): AudioTrack(mediaTrack), RemoteTrack {
    override fun enabled(): Boolean {
        return this.audioTrack.enabled()
    }

    override fun setEnabled(enabled: Boolean) {
        this.audioTrack.setEnabled(enabled)
    }
}