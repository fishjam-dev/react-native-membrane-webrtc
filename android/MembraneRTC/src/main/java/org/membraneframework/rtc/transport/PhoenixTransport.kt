package org.membraneframework.rtc.transport

import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import kotlinx.coroutines.*
import org.membraneframework.rtc.events.ReceivableEvent
import org.membraneframework.rtc.events.SendableEvent
import org.membraneframework.rtc.events.serializeToMap
import org.membraneframework.rtc.utils.ClosableCoroutineScope
import org.phoenixframework.Channel
import org.phoenixframework.Socket
import timber.log.Timber

public class PhoenixTransport constructor(
    val url: String,
    val topic: String,
    private val ioDispatcher: CoroutineDispatcher
) : EventTransport {

    private lateinit var coroutineScope: CoroutineScope
    private var socket: Socket? = null
    private var channel: Channel? = null
    private var listener: EventTransportListener? = null

    private val gson = GsonBuilder().create()

    private var joinContinuation: CancellableContinuation<Unit>? = null

    override suspend fun connect(listener: EventTransportListener) {
        Timber.i("Starting connection...")
        this.listener = listener

        coroutineScope = ClosableCoroutineScope(SupervisorJob() + ioDispatcher)

        socket = Socket(url, emptyMap())
        socket!!.connect()

        var socketRefs: Array<String> = emptyArray()

        suspendCancellableCoroutine<Unit> { continuation ->
            val openRef = socket!!.onOpen {
                continuation.resumeWith(Result.success(Unit))
            }

            val errorRef = socket!!.onError { error, _ ->
                continuation.cancel(EventTransportError.ConnectionError(error.toString()))
            }

            val closeRef = socket!!.onClose {
                continuation.cancel(EventTransportError.ConnectionError("closed"))
            }

            socketRefs += openRef
            socketRefs += errorRef
            socketRefs += closeRef
        }

        socket!!.off(socketRefs.toList())

        socket!!.onError { error, _ ->
            this.listener?.onError(EventTransportError.ConnectionError(error.toString()))
        }

        socket!!.onClose {
            this.listener?.onClose()
        }

        channel = socket!!.channel(topic)

        channel?.join(timeout = 3000L)
            ?.receive("ok") { _ ->
                joinContinuation?.resumeWith(Result.success(Unit))
            }
            ?.receive("error") { _ ->
                joinContinuation?.resumeWith(Result.failure(EventTransportError.Unauthorized("couldn't join phoenix channel")))
            }

        channel?.on("mediaEvent") { message ->
            coroutineScope.async {
                try {
                    val data = message.payload["data"] as String
                    val type = object : TypeToken<Map<String, Any?>>() {}.type

                    val rawMessage: Map<String, Any?> = gson.fromJson(data, type)

                    ReceivableEvent.decode(rawMessage)?.let {
                        listener.onEvent(it)
                    } ?: run {
                        Timber.d("Failed to decode event $rawMessage")
                    }
                } catch (e: Exception) {
                    Timber.e(e)
                }
            }
        }

        return suspendCancellableCoroutine {
            joinContinuation = it
        }
    }

    override suspend fun disconnect() {
        if (channel != null) {
            channel
                ?.leave()
                ?.receive("ok") {
                    socket?.disconnect()
                }
        } else {
            socket?.disconnect()
        }
    }

    override suspend fun send(event: SendableEvent) {
        coroutineScope.async {
            val payload = mapOf(
                "data" to gson.toJson(event.serializeToMap())
            )

            channel ?.push("mediaEvent", payload)
        }
    }
}