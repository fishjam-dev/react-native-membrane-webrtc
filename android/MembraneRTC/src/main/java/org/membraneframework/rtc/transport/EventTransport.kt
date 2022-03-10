package org.membraneframework.rtc.transport

import org.membraneframework.rtc.events.*

/**
 * A base class of exceptions that can be emitted by the <strong>EventTransport</strong> implementations.
 */
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

/**
 * An interface defining a listener to a <strong>EventTransport</strong>.
 */
public interface EventTransportListener {
    fun onEvent(event: ReceivableEvent)
    fun onError(error: EventTransportError)
    fun onClose()
}

/**
 * Interface defining an event transport that the <strong>MembraneRTC</strong> uses for
 * relaying media events from/to the <strong>Membrane RTC Engine</strong>.
 * <p>
 * An implementation of the transport should parse and forward received events to the listener
 * passed with <strong>connect</strong> method.
 */
public interface EventTransport {
    suspend fun connect(listener: EventTransportListener)
    suspend fun disconnect()
    suspend fun send(event: SendableEvent)
}