package com.reactnativemembrane

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlinx.coroutines.Dispatchers
import org.membraneframework.rtc.ConnectOptions
import org.membraneframework.rtc.MembraneRTC
import org.membraneframework.rtc.MembraneRTCError
import org.membraneframework.rtc.MembraneRTCListener
import org.membraneframework.rtc.media.*
import org.membraneframework.rtc.models.Peer
import org.membraneframework.rtc.models.TrackContext
import org.membraneframework.rtc.transport.PhoenixTransport
import java.util.*

class MembraneModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext),
  MembraneRTCListener {
    private val TAG = "MEMBRANE"
    private var room: MembraneRTC? = null

    var localAudioTrack: LocalAudioTrack? = null
    var localVideoTrack: LocalVideoTrack? = null
    var localScreencastTrack: LocalScreencastTrack? = null

    var localDisplayName: String? = null

  private val globalToLocalTrackId = HashMap<String, String>()

    override fun getName(): String {
        return "Membrane"
    }

    @ReactMethod
    fun connect(url: String, roomName: String, displayName: String, promise: Promise) {
      room = MembraneRTC.connect(
        appContext = reactApplicationContext,
        options = ConnectOptions(
          transport = PhoenixTransport(url, "room:$roomName", Dispatchers.IO),
          config = mapOf("displayName" to displayName)
        ),
        listener = this@MembraneModule
      )

    }

  private fun emitEvent(eventName: String, data: Any?) {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, data)
  }

  private fun emitParticipants() {
    val params = Arguments.createMap();
    val participantsArray = Arguments.createArray();
    MembraneRoom.participants.values.filter { it.videoTrack != null }.forEach {
      val participantMap = Arguments.createMap()
      participantMap.putString("id", it.id)
      participantMap.putString("displayName", it.displayName)
      participantsArray.pushMap(participantMap)
    }
    params.putArray("participants", participantsArray);
    emitEvent("ParticipantsUpdate", params)
  }

  override fun onConnected() {
    Log.d(TAG, "on Connected")
    room?.let {
      localAudioTrack = it.createAudioTrack(mapOf(
        "user_id" to (localDisplayName ?: "")
      ))

      var videoParameters = VideoParameters.presetVGA169
      videoParameters = videoParameters.copy(dimensions = videoParameters.dimensions.flip())

      localVideoTrack = it.createVideoTrack(videoParameters, mapOf(
        "user_id" to (localDisplayName ?: "")
      ))

      it.join()

      //isCameraOn.value = localVideoTrack?.enabled() ?: false
      //isMicrophoneOn.value = localAudioTrack?.enabled() ?: false

      val localPeerId = UUID.randomUUID().toString()
      MembraneRoom.participants[localPeerId] = Participant(localPeerId, "Me", localVideoTrack, localAudioTrack)
      emitParticipants()
    }
  }

  override fun onJoinSuccess(peerID: String, peersInRoom: List<Peer>) {
    Log.d(TAG, "on join success")
    peersInRoom.forEach {
      MembraneRoom.participants[it.id] = Participant(it.id, it.metadata["displayName"] ?: "UNKNOWN", null, null)
    }
    emitParticipants()
  }

  override fun onJoinError(metadata: Any) {
    Log.d(TAG, "on join error")
  }

  override fun onTrackReady(ctx: TrackContext) {
      val participant = MembraneRoom.participants[ctx.peer.id] ?: return

      val (id, newParticipant) = when (ctx.track) {
        is RemoteVideoTrack -> {
          globalToLocalTrackId[ctx.trackId] = (ctx.track as RemoteVideoTrack).id()

          if (ctx.metadata["type"] == "screensharing") {
            Pair(ctx.trackId, participant.copy(id = ctx.trackId, displayName = "${participant.displayName} (screencast)", videoTrack = ctx.track as RemoteVideoTrack))
          } else {
            Pair(ctx.peer.id, participant.copy(videoTrack = ctx.track as RemoteVideoTrack))
          }
        }
        is RemoteAudioTrack -> {
          globalToLocalTrackId[ctx.trackId] = (ctx.track as RemoteAudioTrack).id()

          Pair(ctx.peer.id, participant.copy(audioTrack = ctx.track as RemoteAudioTrack))
        }
        else ->
          throw IllegalArgumentException("invalid type of incoming remote track")
      }

    MembraneRoom.participants[id] = newParticipant

      emitParticipants()
  }

  override fun onTrackAdded(ctx: TrackContext) {
    Log.d(TAG, "on track added")
  }

  override fun onTrackRemoved(ctx: TrackContext) {
      if (ctx.metadata["type"] == "screensharing") {
        // screencast is a throw-away type of participant so remove it and emit participants once again
        MembraneRoom.participants.remove(ctx.trackId)
        globalToLocalTrackId.remove(ctx.trackId)

        emitParticipants()
      } else {
        val participant = MembraneRoom.participants[ctx.peer.id] ?: return

        val localTrackId = globalToLocalTrackId[ctx.trackId]
        val audioTrackId = participant.audioTrack?.id()
        val videoTrackId = participant.videoTrack?.id()

        val newParticipant = when {
          localTrackId == videoTrackId ->
            participant.copy(videoTrack = null)

          localTrackId == audioTrackId ->
            participant.copy(audioTrack = null)

          else ->
            throw IllegalArgumentException("track has not been found for given peer")
        }

        globalToLocalTrackId.remove(ctx.trackId)

        MembraneRoom.participants[ctx.peer.id] = newParticipant

        emitParticipants()
    }
  }

  override fun onTrackUpdated(ctx: TrackContext) {
  }

  override fun onPeerJoined(peer: Peer) {
    MembraneRoom.participants[peer.id] = Participant(id = peer.id, displayName = peer.metadata["displayName"] ?: "UNKNOWN")
    emitParticipants()
  }

  override fun onPeerLeft(peer: Peer) {
    MembraneRoom.participants.remove(peer.id)
    emitParticipants()
  }

  override fun onPeerUpdated(peer: Peer) {
  }

  override fun onError(error: MembraneRTCError) {
  }
}
