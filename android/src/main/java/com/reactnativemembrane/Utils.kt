package com.reactnativemembrane

import com.facebook.react.bridge.*
import org.membraneframework.rtc.TrackEncoding

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

internal fun mapToRNMap(map: Map<String, Any>): WritableMap {
  val res = Arguments.createMap()
  map.forEach { entry ->
    when(entry.value) {
      is Map<*, *> -> res.putMap(entry.key, mapToRNMap(entry.value as Map<String, Any>))
      is List<*> -> res.putArray(entry.key, listToRNArray(entry.value as List<Any>))
      is Int -> res.putInt(entry.key, entry.value as Int)
      is Double -> res.putDouble(entry.key, entry.value as Double)
      is Boolean -> res.putBoolean(entry.key, entry.value as Boolean)
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
