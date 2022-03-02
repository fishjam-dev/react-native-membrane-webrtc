package org.membraneframework.rtc.media

import org.webrtc.MediaStreamTrack

open class AudioTrack(protected val audioTrack: org.webrtc.AudioTrack): MediaTrackProvider {
    override fun id(): String {
        return audioTrack.id()
    }

    override fun rtcTrack(): MediaStreamTrack {
        return audioTrack
    }
}