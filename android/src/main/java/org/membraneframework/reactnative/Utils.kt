package org.membraneframework.reactnative

import org.membraneframework.rtc.TrackEncoding

internal fun String.toTrackEncoding(): TrackEncoding {
    return when(this) {
        "l" -> TrackEncoding.L
        "m" -> TrackEncoding.M
        "h" -> TrackEncoding.H
        else -> throw IllegalArgumentException("Invalid encoding specified: $this")
    }
}