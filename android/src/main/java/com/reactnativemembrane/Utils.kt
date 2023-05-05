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
  innerMap.putDouble("bandwidth", if (stats.qualityLimitationDurations?.bandwidth != null) stats.qualityLimitationDurations!!.bandwidth else  0.0)
  innerMap.putDouble("cpu", if (stats.qualityLimitationDurations?.cpu != null) stats.qualityLimitationDurations!!.cpu else  0.0)
  innerMap.putDouble("none", if (stats.qualityLimitationDurations?.none != null) stats.qualityLimitationDurations!!.none else  0.0)
  innerMap.putDouble("other", if (stats.qualityLimitationDurations?.other != null) stats.qualityLimitationDurations!!.other else  0.0)

  val res = Arguments.createMap()
  res.putString("kind", stats.kind)
  res.putString("rid", stats.rid)
  res.putInt("bytesSent",  if (stats.bytesSent?.toInt() != null) stats.bytesSent!!.toInt() else  0)
  res.putDouble("targetBitrate", if (stats.targetBitrate != null) stats.targetBitrate!! else  0.0)
  res.putInt("packetsSent", if (stats.packetsSent?.toInt() != null) stats.packetsSent!!.toInt() else  0)
  res.putInt("framesEncoded", if (stats.framesEncoded?.toInt() != null) stats.framesEncoded!!.toInt() else  0)
  res.putDouble("framesPerSecond", if (stats.framesPerSecond != null) stats.framesPerSecond!! else  0.0)
  res.putInt("frameWidth", if (stats.frameWidth?.toInt() != null) stats.frameWidth!!.toInt() else  0)
  res.putInt("frameHeight", if (stats.frameHeight?.toInt() != null) stats.frameHeight!!.toInt() else  0)
  res.putMap("qualityLimitationDurations", innerMap)

  return res
}

internal fun rtcInboundStatsToRNMap(stats: RTCInboundStats): ReadableMap {
  val res = Arguments.createMap()
  res.putString("kind", stats.kind)
  res.putDouble("jitter", if (stats.jitter != null) stats.jitter!! else  0.0)
  res.putInt("packetsLost",  if (stats.packetsLost != null) stats.packetsLost!! else  0)
  res.putInt("packetsReceived", if (stats.packetsReceived?.toInt() != null) stats.packetsReceived!!.toInt() else  0)
  res.putInt("bytesReceived", if (stats.bytesReceived?.toInt() != null) stats.bytesReceived!!.toInt() else  0)
  res.putInt("framesReceived", if (stats.framesReceived != null) stats.framesReceived!! else  0)
  res.putInt("frameWidth", if (stats.frameWidth?.toInt() != null) stats.frameWidth!!.toInt() else  0)
  res.putInt("frameHeight", if (stats.frameHeight?.toInt() != null) stats.frameHeight!!.toInt() else  0)
  res.putDouble("framesPerSecond", if (stats.framesPerSecond != null) stats.framesPerSecond!! else  0.0)
  res.putInt("framesDropped", if (stats.framesDropped?.toInt() != null) stats.framesDropped!!.toInt() else  0)

  return res
}


internal fun mapToRNMap(map: Map<String, Any>): WritableMap {
  val res = Arguments.createMap()
  map.forEach { entry ->
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
