package com.reactnativemembrane

import com.facebook.react.bridge.*
import org.membraneframework.rtc.TrackEncoding
import org.membraneframework.rtc.models.RTCInboundStats
import org.membraneframework.rtc.models.RTCOutboundStats
import org.membraneframework.rtc.models.RTCStats


internal fun ReadableArray.toList(): List<Any> {
  return this.toArrayList().map {
    when(it) {
      is ReadableMap -> it.toMap()
      is ReadableArray -> it.toList()
      else -> it
    }
  }
}

internal fun ReadableMap.toMap(): MutableMap<String, Any> {
  val res = mutableMapOf<String, Any>()
  this.entryIterator.forEach {
    when (it.value) {
      is ReadableMap -> {
        res[it.key] = (it.value as ReadableMap).toMap()
      }
      is ReadableArray -> {
        res[it.key] = (it.value as ReadableArray).toList()
      }
      else -> {
        res[it.key] = it.value
      }
    }
  }
  return res
}

internal fun listToRNArray(array: List<Any>): WritableArray {
  val res = Arguments.createArray()
  array.forEach {
    when(it) {
      is Map<*, *> -> res.pushMap(mapToRNMap(it as Map<String, Any>))
      is List<*> -> res.pushArray( listToRNArray(it as List<Any>))
      is Int -> res.pushInt(it)
      is Double -> res.pushDouble(it)
      is Boolean -> res.pushBoolean(it as Boolean)
      else -> res.pushString(it.toString())
    }
  }
  return res
}

internal fun rtcOutboundStatsToRNMap(stats: RTCOutboundStats): ReadableMap{
  val innerMap = Arguments.createMap()
  innerMap.putDouble("bandwidth", stats.qualityLimitationDurations?.bandwidth ?: 0.0)
  innerMap.putDouble("cpu", stats.qualityLimitationDurations?.cpu ?: 0.0)
  innerMap.putDouble("none", stats.qualityLimitationDurations?.none ?: 0.0)
  innerMap.putDouble("other", stats.qualityLimitationDurations?.other ?: 0.0)

  val res = Arguments.createMap()
  res.putString("kind", stats.kind)
  res.putString("rid", stats.rid)
  res.putInt("bytesSent",  stats.bytesSent?.toInt() ?:  0)
  res.putDouble("targetBitrate",  stats.targetBitrate ?:  0.0)
  res.putInt("packetsSent",  stats.packetsSent?.toInt() ?:  0)
  res.putInt("framesEncoded",  stats.framesEncoded?.toInt() ?:  0)
  res.putDouble("framesPerSecond",  stats.framesPerSecond ?:  0.0)
  res.putInt("frameWidth",  stats.frameWidth?.toInt() ?:  0)
  res.putInt("frameHeight",  stats.frameHeight?.toInt() ?:  0)
  res.putMap("qualityLimitationDurations",  innerMap)

  return res
}

internal fun rtcInboundStatsToRNMap(stats: RTCInboundStats): ReadableMap {
  val res = Arguments.createMap()
  res.putString("kind", stats.kind)
  res.putDouble("jitter",  stats.jitter ?:  0.0)
  res.putInt("packetsLost",  stats.packetsLost ?:  0)
  res.putInt("packetsReceived",  stats.packetsReceived?.toInt() ?:  0)
  res.putInt("bytesReceived",  stats.bytesReceived?.toInt() ?:  0)
  res.putInt("framesReceived",  stats.framesReceived ?:  0)
  res.putInt("frameWidth",  stats.frameWidth?.toInt() ?:  0)
  res.putInt("frameHeight",  stats.frameHeight?.toInt() ?:  0)
  res.putDouble("framesPerSecond",  stats.framesPerSecond ?:  0.0)
  res.putInt("framesDropped",  stats.framesDropped?.toInt() ?:  0)

  return res
}


internal fun mapToRNMap(map: Map<String, Any>?): WritableMap {
  val res = Arguments.createMap()
  map?.forEach { entry ->
    when(entry.value) {
      is Map<*, *> -> res.putMap(entry.key, mapToRNMap(entry.value as Map<String, Any>))
      is List<*> -> res.putArray(entry.key, listToRNArray(entry.value as List<Any>))
      is Int -> res.putInt(entry.key, entry.value as Int)
      is Double -> res.putDouble(entry.key, entry.value as Double)
      is Boolean -> res.putBoolean(entry.key, entry.value as Boolean)
      is RTCInboundStats -> res.putMap(entry.key, rtcInboundStatsToRNMap(entry.value as RTCInboundStats))
      is RTCOutboundStats -> res.putMap(entry.key, rtcOutboundStatsToRNMap(entry.value as RTCOutboundStats))
      else -> res.putString(entry.key, entry.value.toString())
    }
  }
  return res
}

internal fun String.toTrackEncoding(): TrackEncoding {
  return when(this) {
    "l" -> TrackEncoding.L
    "m" -> TrackEncoding.M
    "h" -> TrackEncoding.H
    else -> throw IllegalArgumentException("Invalid encoding specified: $this")
  }
}
