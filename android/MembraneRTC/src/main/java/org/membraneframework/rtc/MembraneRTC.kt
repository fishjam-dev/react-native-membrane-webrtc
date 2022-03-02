package org.membraneframework.rtc

import android.content.Context
import android.content.Intent
import kotlinx.coroutines.Dispatchers
import org.membraneframework.rtc.dagger.DaggerMembraneRTCComponent
import org.membraneframework.rtc.media.LocalAudioTrack
import org.membraneframework.rtc.media.LocalScreencastTrack
import org.membraneframework.rtc.media.LocalVideoTrack
import org.membraneframework.rtc.media.VideoParameters
import org.membraneframework.rtc.utils.Metadata

public class MembraneRTC
private constructor(
    private var client: InternalMembraneRTC
) {

    public fun join() {
        client.join()
    }

    public fun disconnect() {
        client.disconnect()
    }

    public fun createVideoTrack(videoParameters: VideoParameters, metadata: Metadata): LocalVideoTrack {
        return client.createLocalVideoTrack(videoParameters, metadata)
    }

    public fun createAudioTrack(metadata: Metadata): LocalAudioTrack {
        return client.createLocalAudioTrack(metadata)
    }

    public fun createScreencastTrack(mediaProjectionPermission: Intent, videoParameters: VideoParameters, metadata: Metadata, onEnd: () -> Unit): LocalScreencastTrack? {
        return client.createScreencastTrack(mediaProjectionPermission, videoParameters, metadata, onEnd)
    }

    public fun removeTrack(trackId: String): Boolean {
        return client.removeTrack(trackId)
    }

    companion object {
        fun connect(appContext: Context, options: ConnectOptions, listener: MembraneRTCListener): MembraneRTC {

            val ctx = appContext.applicationContext

            val component = DaggerMembraneRTCComponent
                .factory()
                .create(ctx)

            val client = component
                .membraneRTCFactory()
                .create(options, listener, Dispatchers.Default)

            client.connect()

            return MembraneRTC(client)
        }
    }
}