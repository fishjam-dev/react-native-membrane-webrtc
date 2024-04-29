package org.membraneframework.reactnative

import com.twilio.audioswitch.AudioDevice

enum class AudioDeviceKind(val typeName: String, val audioDeviceClass: Class<out AudioDevice>) {
    BLUETOOTH("bluetooth", AudioDevice.BluetoothHeadset::class.java),
    WIRED_HEADSET("headset", AudioDevice.WiredHeadset::class.java),
    SPEAKER("speaker", AudioDevice.Speakerphone::class.java),
    EARPIECE("earpiece", AudioDevice.Earpiece::class.java);

    companion object {
        fun fromAudioDevice(audioDevice: AudioDevice): AudioDeviceKind? {
            for (kind in values()) {
                if (kind.audioDeviceClass == audioDevice.javaClass) {
                    return kind
                }
            }
            return null
        }

        fun fromTypeName(typeName: String): AudioDeviceKind? {
            for (kind in values()) {
                if (kind.typeName == typeName) {
                    return kind
                }
            }
            return null
        }
    }
}
