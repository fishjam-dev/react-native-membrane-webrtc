package org.membraneframework.rtc.models

import org.membraneframework.rtc.media.RemoteTrack
import org.membraneframework.rtc.utils.Metadata

data class TrackContext(val track: RemoteTrack?, val peer: Peer, val trackId: String, val metadata: Metadata)
