# react-native-membrane

react-native-membrane

# Installation

# Usage

# API

## `useMembraneServer()`

The hook used to manage a connection with membrane server.

### Returns

An object with functions to manage membrane server connection:

### `connect(url: string, roomName: string, connectionOptions: ConnectionOptions)`

Connects to a room.

Arguments:

- `url: string` -- server url
- `roomName: string` -- room name
- `connectionOptions`
  - `quality: VideoQuality` -- resolution + aspect ratio of local video track, one of: `QVGA_169`, `VGA_169`, `QHD_169`, `HD_169`, `FHD_169`, `QVGA_43`, `VGA_43`, `QHD_43`, `HD_43`, `FHD_43`. Note that quality might be worse than specified due to device capabilities, internet connection etc. Default: `VGA_169`.
  - `flipVideo: boolean` -- whether to flip the dimensions of the video, that is whether to film in vertical orientation. Default: `true`
  - `userMetadata: Metadata` -- a map `string -> string` containing user metadata to be sent to the server. Use it to send for example user display name or other options.
  - `videoTrackMetadata: Metadata` -- a map `string -> string` containing video track metadata to be sent to the server.
  - `audioTrackMetadata: Metadata` -- a map `string -> string` containing audio track metadata to be sent to the server.

Returns:
A promise that resolves on success or rejects in case of error.

### `joinRoom()`

Call this after successfully connecting with the server to join the room. Other participants' tracks will be sent and the user will be visible to other room participants.

Returns:
A promise that resolves on success or rejects in case of error.

### `disconnect()`

Call this to gracefully disconnect from the server. After that you can connect again.

Returns:
A promise that resolves on success or rejects in case of error.

### `error`

This variable will contain an error when user failed to connect, join or during a conversation (for example internet connection is lost).

## `useRoomParticipants()`

This hook provides live updates of room participants.

### Returns

An array of room participants.

`type Participant`

- `id: string` -- id used to identify a participant
- `type: ParticipantType` -- used to indicate participant type. Possible values: `Remote`, `Local`, `LocalScreencasting`. When user is screencasting, a new fake participant is created.
- `metadata: Metadata` -- a map string -> string containing participant metadata from the server

## `useCameraState()`

This hook can toggle camera on/off and provides current camera state.

### Returns

An object containig:

- `isCameraOn: boolean`
- `toggleCamera: () => Promise<void>`

## `useMicrophoneState()`

This hook can toggle microphone on/off and provides current microphone state.

### Returns

An object containig:

- `isMicrophoneOn: boolean`
- `toggleMicrophone: () => Promise<void>`

## `flipCamera()`

Function that's toggles between front and back camera. By default the front camera is used.

### Returns

A promise that resolves when camera is toggled.

## `useScreencast()`

This hook can toggle screen sharing on/off and provides current screencast state.

### Returns

An object containing:

- `isScreencastOn: boolean`
- `toggleScreencast(screencastOptions: ScreencastOptions)` - toggles the screencast on/off. Arguments:

  - `screencastOptions: ScreencastOptions`
    - `quality: ScreencastQuality` - resolution + fps of screencast track, one of: `VGA`, `HD5`, `HD15`, `FHD15`, `FHD30`. Note that quality might be worse than specified due to device capabilities, internet connection etc. Default: `HD15`.
    - `screencastMetadata: Metadata` - a map `string -> string` containing screencast track metadata to be sent to the server.

  Under the hood the screencast is just given participant's another video track. However for convenience the library creates a fake screencasting participant. The library recognizes a screencast track by `type: "screencasting"` metadata in screencasting video track.

## `<VideoRendererView />`

A component used for rendering participant's video and audio. You can add some basic View styling.

Props:

- `participantId: string` -- id of the participant which you want to render.
- `videoLayout: VideoLayout` -- `FILL` or `FIT` - it works just like RN `Image` component. `FILL` fills the whole view with video and it may cut some parts of the video. `FIT` scales the video so the whole video is visible, but it may leave some empty space in the view. Default: `FILL`.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
