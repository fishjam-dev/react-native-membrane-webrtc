package org.membraneframework.rtc.utils

import org.webrtc.MediaConstraints
import org.webrtc.PeerConnection
import org.webrtc.SdpObserver
import org.webrtc.SessionDescription
import java.lang.IllegalStateException
import kotlin.coroutines.Continuation
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

class SdpException(reason: String): Exception(reason) { }

class SuspendableSdpObserver: SdpObserver {
    private var createCont: Continuation<Result<SessionDescription>>? = null
    private var setCont: Continuation<Result<Unit>>? = null

    private var returnedResults: Boolean = false

    private var pendingCreate: Result<SessionDescription>? = null
    private var pendingSet: Result<Unit>? = null

    override fun onCreateSuccess(sdp: SessionDescription?) {
        sdp?.also {
            pendingCreate = Result.success(it)
        } ?: run {
            pendingCreate = Result.failure(SdpException("onCreateSuccess returned an empty sdp"))
        }

        createCont?.let {
            it.resume(pendingCreate!!)
            returnedResults = true
        }
    }

    override fun onSetSuccess() {
        pendingSet = Result.success(Unit)

        setCont?.let {
            it.resume(pendingSet!!)
            returnedResults = true
        }
    }

    override fun onCreateFailure(reason: String?) {
        pendingCreate = Result.failure(SdpException("failed to create sdp: $reason"))

        createCont?.let {
            it.resume(pendingCreate!!)
        }
    }

    override fun onSetFailure(reason: String?) {
        pendingSet = Result.failure(SdpException("failed to set sdp: $reason"))

        setCont?.let {
            it.resume(pendingSet!!)
        }
    }

    suspend fun awaitCreate() = suspendCoroutine<Result<SessionDescription>> {  cont ->
        if (returnedResults) throw IllegalStateException("observer already returned")
        createCont = cont

        pendingCreate?.let {
            cont.resume(it)
            returnedResults = true
        }

    }

    suspend fun awaitSet() = suspendCoroutine<Result<Unit>> {  cont ->
        if (returnedResults) throw IllegalStateException("observer already returned")
        setCont = cont

        pendingSet?.let {
            cont.resume(it)
            returnedResults = true
        }
    }
}

suspend fun PeerConnection.createOffer(constraints: MediaConstraints): Result<SessionDescription> {
    val observer = SuspendableSdpObserver()
    this.createOffer(observer, constraints)

    return observer.awaitCreate()
}

suspend fun PeerConnection.setLocalDescription(sdp: SessionDescription): Result<Unit> {
    val observer = SuspendableSdpObserver()
    this.setLocalDescription(observer, sdp)
    return observer.awaitSet()
}

suspend fun PeerConnection.createAnswer(constraints: MediaConstraints): Result<SessionDescription> {
    val observer = SuspendableSdpObserver()
    this.createAnswer(observer, constraints)
    return observer.awaitCreate()
}

suspend fun PeerConnection.setRemoteDescription(sdp: SessionDescription): Result<Unit> {
    val observer = SuspendableSdpObserver()
    this.setRemoteDescription(observer, sdp)
    return observer.awaitSet()
}
