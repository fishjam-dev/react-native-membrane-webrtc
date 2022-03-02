package org.membraneframework.rtc.media.screencast

import android.app.Notification
import android.content.ComponentName
import android.content.Context
import android.content.Context.BIND_AUTO_CREATE
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.Continuation
import kotlin.coroutines.resume

class ScreencastServiceConnector(private val context: Context) {
    private var connected = false
    private var service: ScreencastService? = null

    private val awaitingConnects = mutableSetOf<Continuation<Unit>>()

    private val connection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, binder: IBinder?) {
            connected = true
            service = (binder as ScreencastService.ScreencastBinder).service

            onConnected()
        }

        override fun onServiceDisconnected(p0: ComponentName?) {
            connected = true
            service = null
        }
    }

    private fun onConnected() {
        synchronized(this) {
            awaitingConnects.forEach {
                it.resume(Unit)
            }

            awaitingConnects.clear()
        }
    }

    fun start(notificationId: Int? = null, notification: Notification? = null) {
        service?.start(notificationId, notification)
    }

    suspend fun connect() {
        if (connected) return

        val intent = Intent(context, ScreencastService::class.java)

        context.bindService(intent, connection, BIND_AUTO_CREATE)

        return suspendCancellableCoroutine {
            synchronized(this) {
                if (connected)  {
                    it.resume(Unit)
                } else {
                    awaitingConnects.add(it)
                }
            }
        }
    }

    fun stop() {
        if (connected) {
            context.unbindService(connection)
        }
        connected = false
        service = null
    }
}