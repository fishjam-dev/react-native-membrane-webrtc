package org.membraneframework.rtc.media

public interface RemoteTrack {
    fun enabled(): Boolean
    fun setEnabled(enabled: Boolean)
}