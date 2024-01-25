package com.reactnativemembrane

import org.membraneframework.rtc.SimulcastConfig
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
  val tracksData: HashMap<String, TrackData> = hashMapOf(),
  ) {

    fun addOrUpdateTrack(videoTrack: VideoTrack, metadata: Metadata, simulcastConfig: SimulcastConfig?) {
        val trackData = this.tracksData[videoTrack.id()]
        val newTrackData = TrackData(simulcastConfig = simulcastConfig ?: trackData?.simulcastConfig, metadata = metadata)
        this.tracksData[videoTrack.id()] = newTrackData
        this.videoTracks[videoTrack.id()] = videoTrack
    }

    fun addOrUpdateTrack(audioTrack: AudioTrack, metadata: Metadata)  {
        val trackData = this.tracksData[audioTrack.id()]
        val newTrackData = TrackData(simulcastConfig = trackData?.simulcastConfig, metadata = metadata)
        this.tracksData[audioTrack.id()] = newTrackData
        this.audioTracks[audioTrack.id()] = audioTrack
    }

    fun removeTrack(videoTrack: VideoTrack) {
        this.tracksData.remove(videoTrack.id())
        this.videoTracks.remove(videoTrack.id())
    }

    fun removeTrack(audioTrack: AudioTrack) {
        this.tracksData.remove(audioTrack.id())
        this.audioTracks.remove(audioTrack.id())
    }
}
