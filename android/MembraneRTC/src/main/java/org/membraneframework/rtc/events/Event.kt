package org.membraneframework.rtc.events

import com.google.gson.Gson
import com.google.gson.JsonParseException
import com.google.gson.annotations.SerializedName
import com.google.gson.reflect.TypeToken
import org.membraneframework.rtc.models.Peer
import org.membraneframework.rtc.utils.Metadata
import org.membraneframework.rtc.utils.Payload
import timber.log.Timber

val gson = Gson()

//convert a data class to a map
fun <T> T.serializeToMap(): Map<String, Any?> {
    return convert()
}

//convert a map to a data class
inline fun <reified T> Map<String, Any?>.toDataClass(): T {
    return convert()
}

//convert an object of type I to type O
inline fun <I, reified O> I.convert(): O {
    val json = gson.toJson(this)
    return gson.fromJson(json, object : TypeToken<O>() {}.type)
}

sealed class SendableEvent

data class Join(val type: String, val data: Data): SendableEvent() {
    data class Data(val metadata: Metadata)

    constructor(metadata: Metadata): this("join", Data(metadata))
}

data class SdpOffer(val type: String, val data: Payload): SendableEvent() {
    constructor(sdp: String, trackIdToTrackMetadata: Map<String, Metadata>, midToTrackId: Map<String, String>):
            this("custom", mapOf(
                "type" to "sdpOffer",
                "data" to mapOf(
                    "sdpOffer" to mapOf(
                        "type" to "offer",
                        "sdp" to sdp
                    ),
                    "trackIdToTrackMetadata" to trackIdToTrackMetadata,
                    "midToTrackId" to midToTrackId
                )

            ))
}

data class LocalCandidate(val type: String, val data: Payload): SendableEvent() {
    constructor(candidate: String, sdpMLineIndex: Int):
            this("custom", mapOf(
                "type" to "candidate",
                "data" to mapOf(
                    "candidate" to candidate,
                    "sdpMLineIndex" to sdpMLineIndex
                )
            ))
}

data class RenegotiateTracks(val type: String, val data: Payload): SendableEvent() {
    constructor():
            this("custom", mapOf(
                    "type" to "renegotiateTracks"
                )
            )
}

public enum class ReceivableEventType() {
    @SerializedName("peerAccepted")
    PeerAccepted,
    @SerializedName("peerDenied")
    PeerDenied,
    @SerializedName("peerJoined")
    PeerJoined,
    @SerializedName("peerLeft")
    PeerLeft,
    @SerializedName("peerUpdated")
    PeerUpdated,
    @SerializedName("custom")
    Custom,
    @SerializedName("offerData")
    OfferData,
    @SerializedName("candidate")
    Candidate,
    @SerializedName("tracksAdded")
    TracksAdded,
    @SerializedName("tracksRemoved")
    TracksRemoved,
    @SerializedName("trackUpdated")
    TrackUpdated,
    @SerializedName("sdpAnswer")
    SdpAnswer,
}

internal data class BaseReceivableEvent(val type: ReceivableEventType)

sealed class ReceivableEvent {

    companion object {
        fun decode(payload: Payload): ReceivableEvent? {
            try {
                val eventBase: BaseReceivableEvent = payload.toDataClass()

                return when (eventBase.type) {
                    ReceivableEventType.PeerAccepted ->
                        payload.toDataClass<PeerAccepted>()

                    ReceivableEventType.PeerDenied ->
                        payload.toDataClass<PeerAccepted>()

                    ReceivableEventType.PeerJoined ->
                        payload.toDataClass<PeerJoined>()

                    ReceivableEventType.PeerLeft ->
                        payload.toDataClass<PeerLeft>()

                    ReceivableEventType.PeerUpdated ->
                        payload.toDataClass<PeerUpdated>()

                    ReceivableEventType.TracksAdded ->
                        payload.toDataClass<TracksAdded>()

                    ReceivableEventType.TracksRemoved ->
                        payload.toDataClass<TracksRemoved>()

                    ReceivableEventType.TrackUpdated ->
                        payload.toDataClass<TrackUpdated>()

                    ReceivableEventType.Custom -> {
                        val customEventBase = payload.toDataClass<BaseCustomEvent>()

                        return when (customEventBase.data.type) {
                            ReceivableEventType.OfferData ->
                                payload.toDataClass<CustomEvent<OfferData>>().data

                            ReceivableEventType.Candidate ->
                                payload.toDataClass<CustomEvent<RemoteCandidate>>().data

                            ReceivableEventType.SdpAnswer ->
                                payload.toDataClass<CustomEvent<SdpAnswer>>().data

                            else ->
                                null
                        }
                    }

                    else ->
                        null
                }
            } catch(e: JsonParseException) {
                Timber.e(e)
                return null
            }
        }
    }
}

data class PeerAccepted(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val id : String, val peersInRoom: List<Peer>)
}

data class PeerDenied(val type: ReceivableEventType): ReceivableEvent() { }

data class PeerJoined(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peer: Peer)
}

data class PeerLeft(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peerId: String)
}

data class PeerUpdated(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peerId: String, val metadata: Metadata)
}

data class OfferData(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class TurnServer(val username: String, val password: String, val serverAddr: String, val serverPort: UInt, val transport: String)

    data class Data(val iceTransportPolicy: String, val integratedTurnServers: List<TurnServer>, val tracksTypes: Map<String, Int>)
}

data class TracksAdded(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peerId: String, val trackIdToMetadata: Map<String, Metadata>)
}

data class TracksRemoved(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peerId: String, val trackIds: List<String>)
}

data class TrackUpdated(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val peerId: String, val trackId: String, val metadata: Metadata)
}

data class SdpAnswer(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val type: String, val sdp: String, val midToTrackId: Map<String, String>)
}

data class RemoteCandidate(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val candidate: String, val sdpMLineIndex: Int, val sdpMid: String?)
}

data class BaseCustomEvent(val type: ReceivableEventType, val data: Data): ReceivableEvent() {
    data class Data(val type: ReceivableEventType)
}

class CustomEvent<Event: ReceivableEvent>(val type: ReceivableEventType, val data: Event)
