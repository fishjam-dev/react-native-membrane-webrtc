package com.reactnativemembrane

import java.util.HashMap

object MembraneRoom {
  val participants = LinkedHashMap<String, Participant>()
  var roomObserver: (() -> Unit)? = null
}
