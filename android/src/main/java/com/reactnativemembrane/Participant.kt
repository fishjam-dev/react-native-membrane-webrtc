package com.reactnativemembrane

import org.membraneframework.rtc.media.AudioTrack
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.utils.Metadata

data class Participant(val id: String, val metadata: Metadata, val videoTrack: VideoTrack? = null, val audioTrack: AudioTrack? = null, val isScreencast: Boolean = false)
