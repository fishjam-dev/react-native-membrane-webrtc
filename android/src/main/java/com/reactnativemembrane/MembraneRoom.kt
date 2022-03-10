package com.reactnativemembrane

import java.util.HashMap

object MembraneRoom {
  val participants = HashMap<String, Participant>()
  var roomObserver: (() -> Unit)? = null
}
