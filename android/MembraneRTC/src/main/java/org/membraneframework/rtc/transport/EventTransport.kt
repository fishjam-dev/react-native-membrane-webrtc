package org.membraneframework.rtc.transport

import org.membraneframework.rtc.events.*


sealed class EventTransportError: Exception() {
    data class Unauthorized(val reason: String): EventTransportError()
    data class ConnectionError(val reason: String): EventTransportError()
    data class Unexpected(val reason: String): EventTransportError()

    override fun toString(): String {
        return when (this) {
            is Unauthorized ->
                "User is unauthorized to use the transport: ${this.reason}"
            is ConnectionError ->
                "Failed to connect with the remote side: ${this.reason}"
            is Unexpected ->
                "Encountered unexpected error: ${this.reason}"
        }
    }
}

public interface EventTransportListener {
    fun onEvent(event: ReceivableEvent)
    fun onError(error: EventTransportError)
    fun onClose()
}

public interface EventTransport {
    suspend fun connect(listener: EventTransportListener)
    suspend fun disconnect()
    suspend fun send(event: SendableEvent)
}