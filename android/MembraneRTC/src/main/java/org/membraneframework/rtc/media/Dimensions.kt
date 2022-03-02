package org.membraneframework.rtc.media

import kotlin.math.abs

data class Dimensions(val width: Int, val height: Int) {
    companion object {
        const val aspect16By9 = 16.0 / 9.0
        const val aspect4By3 = 4.0 / 3.0

    }

    fun flip(): Dimensions {
        return Dimensions(width = this.height, height = this.width)
    }

    fun computeSuggestedPresets(): List<VideoParameters> {
        val aspect = width.toDouble() / height.toDouble()

        if (abs(aspect - aspect16By9) < abs(aspect - Dimensions.aspect4By3)) {
            return VideoParameters.presets169
        }
        return VideoParameters.presets43
    }

    fun computeSuggestedPreset(presets: List<VideoParameters>): VideoParameters {
        assert(!presets.isEmpty())
        var result = presets[0]
        for (preset in presets) {
            if (width >= preset.dimensions.width && height >= preset.dimensions.height) {
                result = preset
            }
        }
        return result
    }
}

public data class VideoEncoding(val maxBitrate: Int, val maxFps: Int)

public data class VideoParameters(val dimensions: Dimensions, val encoding: VideoEncoding) {

    companion object {
        // 4:3 aspect ratio
        val presetQVGA43 = VideoParameters(
            dimensions = Dimensions(width = 240, height = 180),
            encoding = VideoEncoding(maxBitrate = 90000, maxFps = 10)
        )
        val presetVGA43 = VideoParameters(
            dimensions = Dimensions(width= 480, height= 360),
            encoding= VideoEncoding(maxBitrate= 225_000, maxFps= 20)
        )
        val presetQHD43 = VideoParameters(
            dimensions = Dimensions(width= 720, height= 540),
            encoding= VideoEncoding(maxBitrate= 450_000, maxFps= 25)
        )
        val presetHD43 = VideoParameters(
            dimensions = Dimensions(width= 960, height= 720),
            encoding= VideoEncoding(maxBitrate= 1_500_000, maxFps= 30)
        )
        val presetFHD43 = VideoParameters(
            dimensions = Dimensions(width= 1440, height= 1080),
            encoding= VideoEncoding(maxBitrate= 2_800_000, maxFps= 30)
        )

        // 16:9 aspect ratio
        val presetQVGA169 = VideoParameters(
            dimensions = Dimensions(width= 320, height= 180),
            encoding= VideoEncoding(maxBitrate= 120_000, maxFps= 10)
        )
        val presetVGA169 = VideoParameters(
            dimensions = Dimensions(width= 640, height= 360),
            encoding= VideoEncoding(maxBitrate= 300_000, maxFps= 20)
        )
        val presetQHD169 = VideoParameters(
            dimensions = Dimensions(width= 960, height= 540),
            encoding= VideoEncoding(maxBitrate= 600_000, maxFps= 25)
        )
        val presetHD169 = VideoParameters(
            dimensions = Dimensions(width= 1280, height= 720),
            encoding= VideoEncoding(maxBitrate= 2_000_000, maxFps= 30)
        )
        val  presetFHD169 = VideoParameters(
            dimensions = Dimensions(width= 1920, height= 1080),
            encoding= VideoEncoding(maxBitrate= 3_000_000, maxFps= 30)
        )

        // Screen share
        val presetScreenShareVGA = VideoParameters(
            dimensions = Dimensions(width= 640, height= 360),
            encoding= VideoEncoding(maxBitrate= 200_000, maxFps= 3)
        )
        val presetScreenShareHD5 = VideoParameters(
            dimensions = Dimensions(width= 1280, height= 720),
            encoding= VideoEncoding(maxBitrate= 400_000, maxFps= 5)
        )
        val presetScreenShareHD15 = VideoParameters(
            dimensions = Dimensions(width= 1280, height= 720),
            encoding= VideoEncoding(maxBitrate= 1_000_000, maxFps= 15)
        )
        val presetScreenShareFHD15 = VideoParameters(
            dimensions = Dimensions(width= 1920, height= 1080),
            encoding= VideoEncoding(maxBitrate= 1_500_000, maxFps= 15)
        )
        val presetScreenShareFHD30 = VideoParameters(
            dimensions = Dimensions(width= 1920, height= 1080),
            encoding= VideoEncoding(maxBitrate= 3_000_000, maxFps= 30)
        )

        val presets43 = listOf(
            presetQVGA43,
            presetVGA43,
            presetQHD43,
            presetHD43,
            presetFHD43
        )

        val presets169 = listOf(
            presetQVGA169,
            presetVGA169,
            presetQHD169,
            presetHD169,
            presetFHD169
        )

        val presetsScreenShare = listOf(
            presetScreenShareVGA,
            presetScreenShareHD5,
            presetScreenShareHD15,
            presetScreenShareFHD15,
            presetScreenShareFHD30
        )
    }
}
