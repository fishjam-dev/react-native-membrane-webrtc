package org.membraneframework.rtc

sealed class MembraneRTCError: Exception() {
    data class RTC(val reason: String): MembraneRTCError()
    data class Transport(val reason: String): MembraneRTCError()
    data class Unknown(val reason: String): MembraneRTCError()

    override fun toString(): String {
        return when (this) {
            is RTC ->
                "RTC error: ${this.reason}"
            is Transport ->
                "Transport error: ${this.reason}"
            is Unknown ->
                "Unknown error: ${this.reason}"
        }
    }
}