package org.membraneframework.rtc.media.screencast

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Binder
import android.os.Build
import android.os.IBinder
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat

// TODO: this is stolen, consider giving some props to livekit team
class ScreencastService: Service() {
    private var binder: IBinder = ScreencastBinder()
    private var bindCount = 0

    override fun onBind(intent: Intent?): IBinder {
        bindCount++
        return binder
    }

    fun start(notificationId: Int?, notification: Notification?) {
        val properNotification = if (notification != null) {
            notification
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                createNotificationChannel()
            }

            NotificationCompat.Builder(this, DEFAULT_CHANNEL_ID)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .build()
        }

        startForeground(notificationId ?: DEFAULT_NOTIFICATION_ID, properNotification)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            DEFAULT_CHANNEL_ID,
            "Screen Capture",
            NotificationManager.IMPORTANCE_LOW
        )

        val service = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        service.createNotificationChannel(channel)
    }

    override fun onUnbind(intent: Intent?): Boolean {
        bindCount--

        if (bindCount == 0) {
            stopForeground(true)
            stopSelf()
        }

        return false
    }

    inner class ScreencastBinder : Binder() {
        val service: ScreencastService
            get() = this@ScreencastService
    }

    companion object {
        const val DEFAULT_NOTIFICATION_ID = 7777
        const val DEFAULT_CHANNEL_ID = "membrane_screen_capture"
    }
}