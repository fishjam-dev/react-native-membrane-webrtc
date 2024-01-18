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
  val tracks: HashMap<String, TrackData> = hashMapOf(),
  ) {

    fun addOrUpdateTrack(videoTrack: VideoTrack, metadata: Metadata) {
        val trackData = this.tracks[videoTrack.id()]
        val newTrackData = TrackData(simulcastConfig = trackData?.simulcastConfig, metadata = metadata)
        this.tracks[videoTrack.id()] = newTrackData
        this.videoTracks[videoTrack.id()] = videoTrack
    }

    fun addOrUpdateTrack(audioTrack: AudioTrack, metadata: Metadata) {
        val trackData = this.tracks[audioTrack.id()]
        val newTrackData = TrackData(simulcastConfig = trackData?.simulcastConfig, metadata = metadata)
        this.tracks[audioTrack.id()] = newTrackData
        this.audioTracks[audioTrack.id()] = audioTrack
    }

    fun removeTrack(videoTrack: VideoTrack) {
        this.tracks.remove(videoTrack.id())
        this.videoTracks.remove(videoTrack.id())
    }

    fun removeTrack(audioTrack: AudioTrack) {
        this.tracks.remove(audioTrack.id())
        this.audioTracks.remove(audioTrack.id())
    }
}
