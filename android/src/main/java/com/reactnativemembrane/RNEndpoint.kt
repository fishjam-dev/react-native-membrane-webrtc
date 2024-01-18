package com.reactnativemembrane

import org.membraneframework.rtc.media.AudioTrack
import org.membraneframework.rtc.media.VideoTrack
import org.membraneframework.rtc.models.TrackData
import org.membraneframework.rtc.utils.Metadata

data class RNEndpoint(
  val id: String,
  val metadata: Metadata? = hashMapOf(),
  val type: String?,
  val videoTracks: HashMap<String, VideoTrack> = hashMapOf(),
  val audioTracks: HashMap<String, AudioTrack> = hashMapOf(),
  val tracksMetadata: HashMap<String, Metadata> = hashMapOf(),
  val tracks: Map<String, TrackData> = mapOf(),
  ) {

    fun addOrUpdateTrack(videoTrack: VideoTrack, metadata: Metadata) {
        this.tracksMetadata[videoTrack.id()] = metadata
        this.videoTracks[videoTrack.id()] = videoTrack
    }

    fun addOrUpdateTrack(audioTrack: AudioTrack, metadata: Metadata) {
        this.tracksMetadata[audioTrack.id()] = metadata
        this.audioTracks[audioTrack.id()] = audioTrack
    }

    fun removeTrack(videoTrack: VideoTrack) {
        this.tracksMetadata.remove(videoTrack.id())
        this.videoTracks.remove(videoTrack.id())
    }

    fun removeTrack(audioTrack: AudioTrack) {
        this.tracksMetadata.remove(audioTrack.id())
        this.audioTracks.remove(audioTrack.id())
    }
}
