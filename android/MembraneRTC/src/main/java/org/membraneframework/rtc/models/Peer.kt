package org.membraneframework.rtc.models

import org.membraneframework.rtc.utils.Metadata

data class Peer(val id: String, val metadata: Metadata, val trackIdToMetadata: Map<String, Metadata>) {
    fun withTrack(trackId: String, metadata: Metadata): Peer {
        val newTrackIdToMetadata = this.trackIdToMetadata.toMutableMap()
        newTrackIdToMetadata[trackId] = metadata

        return this.copy(trackIdToMetadata = newTrackIdToMetadata)
    }

    fun withoutTrack(trackId: String): Peer {
        val newTrackIdToMetadata = this.trackIdToMetadata.toMutableMap()
        newTrackIdToMetadata.remove(trackId)

        return this.copy(trackIdToMetadata = newTrackIdToMetadata)
    }
}
