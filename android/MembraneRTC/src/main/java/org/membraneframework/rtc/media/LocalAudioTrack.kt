package org.membraneframework.rtc.media

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat.requestPermissions
import androidx.core.content.ContextCompat
import org.webrtc.MediaConstraints
import org.webrtc.PeerConnectionFactory
import java.util.*

public class LocalAudioTrack constructor(
    var mediaTrack: org.webrtc.AudioTrack
): AudioTrack(mediaTrack), LocalTrack {

    override fun start() {
    }

    override fun stop() {
    }

    override fun enabled(): Boolean {
        return audioTrack.enabled()
    }

    override fun setEnabled(enabled: Boolean) {
        audioTrack.setEnabled(enabled)
    }

    companion object {
        fun create(context: Context, factory: PeerConnectionFactory): LocalAudioTrack {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.RECORD_AUDIO) !=
                PackageManager.PERMISSION_GRANTED
            ) {
                throw SecurityException("Missing permissions to start recording the audio")
            }

            val items = listOf(
                MediaConstraints.KeyValuePair("googEchoCancellation", "true"),
                MediaConstraints.KeyValuePair("googAutoGainControl", "true"),
                MediaConstraints.KeyValuePair("googHighpassFilter", "true"),
                MediaConstraints.KeyValuePair("googNoiseSuppression", "true"),
                MediaConstraints.KeyValuePair("googTypingNoiseDetection", "true"),
            )

            val audioConstraints = MediaConstraints()
            audioConstraints.optional.addAll(items)

            val audioSource = factory.createAudioSource(audioConstraints)
            val audioTrack = factory.createAudioTrack(UUID.randomUUID().toString(), audioSource)

            return LocalAudioTrack(mediaTrack = audioTrack)
        }
    }
}