package com.reactnativemembrane

import org.membraneframework.rtc.media.AudioTrack
import org.membraneframework.rtc.media.VideoTrack

data class Participant(val id: String, val displayName: String, val videoTrack: VideoTrack? = null, val audioTrack: AudioTrack? = null, val isScreencast: Boolean = false)
