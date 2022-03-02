package org.membraneframework.rtc.dagger

import android.content.Context
import dagger.BindsInstance
import dagger.Component
import org.membraneframework.rtc.InternalMembraneRTC
import org.webrtc.EglBase
import org.webrtc.PeerConnectionFactory
import javax.inject.Singleton

@Singleton
@Component(
    modules = [
        RTCModule::class
    ]
)
internal interface MembraneRTCComponent {
    fun membraneRTCFactory(): InternalMembraneRTC.Factory

    fun eglBase(): EglBase

    fun peerConnectionFactory(): PeerConnectionFactory

    @Component.Factory
    interface Factory {
        fun create(
            @BindsInstance appContext: Context
        ): MembraneRTCComponent
    }
}