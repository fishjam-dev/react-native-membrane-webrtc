package com.reactnativemembrane

import org.membraneframework.rtc.TrackEncoding
import org.membraneframework.rtc.SimulcastConfig
import java.io.Serializable

enum class SerializableTrackEncoding(val rid: String) : Serializable {
  L("l"), M("m"), H("h");

  companion object {
    fun fromTrackEncoding(encoding: TrackEncoding?): SerializableTrackEncoding? {
      return values().find { it.rid == encoding?.rid }
    }

    fun toTrackEncoding(encoding: SerializableTrackEncoding?): TrackEncoding? {
      return encoding?.let {TrackEncoding.fromString(it.rid) }
    }
  }
}

data class SerializableSimulcastConfig(
  val enabled: Boolean = false,
  val activeEncodings: List<SerializableTrackEncoding>? = listOf()
) : Serializable {
  companion object {
    fun fromSimulcastConfig(config: SimulcastConfig?): SerializableSimulcastConfig? {
      if(config == null) return null
      return SerializableSimulcastConfig(
        enabled = config.enabled,
        activeEncodings = config.activeEncodings.mapNotNull { SerializableTrackEncoding.fromTrackEncoding(it) }
      )
    }

    fun toSimulcastConfig(config: SerializableSimulcastConfig?): SimulcastConfig? {
      return config?.activeEncodings?.let {
        SimulcastConfig(
          enabled = config.enabled,
          activeEncodings = it.mapNotNull {
            SerializableTrackEncoding.toTrackEncoding(
              it
            )
          }
        )
      }
    }
  }
}
