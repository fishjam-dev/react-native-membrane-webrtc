package org.membraneframework.rtc.media

import org.webrtc.MediaStreamTrack


interface MediaTrackProvider {
    fun id(): String
    fun rtcTrack(): MediaStreamTrack
}
