# react-native-membrane-webrtc

react-native-membrane-webrtc is a React Native wrapper for [membrane-webrtc-android](https://github.com/membraneframework/membrane-webrtc-android) and [membrane-webrtc-ios](https://github.com/membraneframework/membrane-webrtc-ios). It allows you to quickly and easily create a mobile client app in React Native for Membrane server.

# Installation

Firstly install react-native-membrane with `yarn` or `npm`

```
yarn add @membraneframework/react-native-membrane-webrtc
```

or

```
npm install --save @membraneframework/react-native-membrane-webrtc
```

### Android

1. Add camera and microphone permissions to your `AndroidManifest.xml`.
2. Rebuild the app. That's it!

### iOS

On iOS installation is a bit more complicated, because you need to setup a screen broadcast app extension for screensharing.

1. Add camera and microphone permissions to your main `Info.plist`.
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>Allow $(PRODUCT_NAME) to use the camera</string>
   <key>NSMicrophoneUsageDescription</key>
   <string>Allow $(PRODUCT_NAME) to use the microphone</string>
   ```
2. Open your `<your-project>.xcworkspace` in Xcode
3. Create new Broadcast Upload Extension. Select File → New → Target... → Broadcast Upload Extension → Next. Choose the name for the new target, select Swift language and deselect "Include UI Extension".

   ![New target config](/.github/xcode1.png)

   Press Finish. In the next alert xcode will ask you if you want to activate the new scheme - press Cancel.

4. Configure app group. Go to "Signing & Capabilities" tab, click "+ Capability" button in upper left corner and select "App Groups".

   ![App groups config](/.github/xcode2.png)

   Then in the "App Groups" add a new group or select existing. Usually group name has format `group.<your-bundle-identifier>`. Verify that both app and extension targets have app group and dev team set correctly.

5. A new folder with app extension should appear on the left with contents like this:

   ![App extension files](/.github/xcode3.png)

   Replace `SampleHandler.swift` with `MembraneBroadcastSampleHandler.swift` and this code:

   ```swift
   import Foundation
   import MembraneRTC
   import os.log
   import ReplayKit
   import WebRTC


   /// App Group used by the extension to exchange buffers with the target application
   let appGroup = "{{GROUP_IDENTIFIER}}"

   let logger = OSLog(subsystem: "{{BUNDLE_IDENTIFIER}}.MembraneBroadcastSampleHandler", category: "Broadcaster")

   /// An example `SampleHandler` utilizing `BroadcastSampleSource` from `MembraneRTC` sending broadcast samples and necessary notification enabling device's screencast.
   class MembraneBroadcastSampleHandler: RPBroadcastSampleHandler {
       let broadcastSource = BroadcastSampleSource(appGroup: appGroup)
       var started: Bool = false


       override func broadcastStarted(withSetupInfo _: [String: NSObject]?) {
           started = broadcastSource.connect()

           guard started else {
               os_log("failed to connect with ipc server", log: logger, type: .debug)

               super.finishBroadcastWithError(NSError(domain: "", code: 0, userInfo: nil))

               return
           }

           broadcastSource.started()
       }

       override func broadcastPaused() {
           broadcastSource.paused()
       }

       override func broadcastResumed() {
           broadcastSource.resumed()
       }

       override func broadcastFinished() {
           broadcastSource.finished()
       }

       override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
           guard started else {
               return
           }

           broadcastSource.processFrame(sampleBuffer: sampleBuffer, ofType: sampleBufferType)
       }
   }
   ```

   Replace `{{GROUP_IDENTIFIER}}` and `{{BUNDLE_IDENTIFIER}}` with your group identifier and bundle identifier respectively.

6. In project's Podfile add the following code:
   ```rb
   target 'MembraneScreenBroadcastExtension' do
     pod 'MembraneRTC/Broadcast'
   end
   ```
   > This new dependency should be added outside of your application target. Example
   > ```rb
   > target 'ReactNativeMembraneExample' do
   >  ...
   > end
   > 
   > target 'MembraneScreenBroadcastExtension' do
   >  pod 'MembraneRTC/Broadcast'
   > end
   > ```
7. Run `pod install` in your `ios/` directory
8. Add the following constants in your Info.plist:
   ```xml
   <key>AppGroupName</key>
   <string>{{GROUP_IDENTIFIER}}</string>
   <key>ScreencastExtensionBundleId</key>
   <string>{{BUNDLE_IDENTIFIER}}.MembraneBroadcastSampleHandler</string>
   ```
   Replace `{{GROUP_IDENTIFIER}}` and `{{BUNDLE_IDENTIFIER}}` with your group identifier and bundle identifier respectively.
9. Rebuild the app and enjoy!

# Example

We strongly recommend checking out our example app that implements a basic video room client. To run the app:

1. Go to Membrane's server demo repo: https://github.com/membraneframework/membrane_videoroom. Follow instructions there to setup and run demo server.
2. Clone the repo
3. ```
   $ cd example
   $ yarn
   ```
4. In App.ts replace server url with your server's url.
5. `yarn run android` or `yarn run ios` or run project from Android Studio / Xcode just like every RN project. Note that simulators won't work, you have to test on real device for camera and screensharing to run.

# Usage

Start with connecting to the membrane server. Use `useMembraneServer()` hook to manage connection:

```ts
const { connect, joinRoom, disconnect, error } = useMembraneServer();
```

Connect to the server using the `connect` function and then join the room. Use user metadata to pass things like usernames etc. to the server. After joining the room the user is visible to their peers and vice-versa.

```ts
const startServerConnection = () => {
  try {
    await connect('https://example.com', "Annie's room", {
      userMetadata: {
        displayName: 'Annie',
      },
    });
    await joinRoom();
  } catch (e) {
    console.log('error!');
  }
};
```

Remember to gracefully disconnect from the server using the `disconnect()` function:

```ts
const stopServerConnection = () => {
  await disconnect();
};
```

Also handle errors properly, for example when internet connection fails or server is down:

```ts
useEffect(() => {
  if (error) console.log('error: ', e);
}, [error]);
```

If you have the connection set up, then use `useParticipants()` hook to track the participants. One of the participants will be a local participant (the one who's using the device). When peer joins or leaves the room, the participants will be updated automatically. Simply call the hook like this:

```ts
const participants = useParticipants();
```

When you have the participants all that's left is to render them. Use `<VideoRendererView />` component like this:

```ts
{
  participants.map((participant) => (
    <VideoRendererView participantId={participant.id} />
  ));
}
```

You can style the views to lay out them however you'd like, basic animations should work too.

There are also some simple hooks for toggling camera, microphone and screensharing. Use them like this:

```ts
const { isCameraOn, toggleCamera } = useCameraState();
const { isMicrophoneOn, toggleMicrophone } = useMicrophoneState();
```

For screencasting use `useScreencast()` hook. A new participant will be added with type `LocalScreencasting` and you can render it just like any other participant with <VideoRendererView />:

```ts
const { isScreencastOn, toggleScreencast } = useScreencast();
...
toggleScreencast({screencastMetadata: { displayName: "Annie's desktop" }});
```

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
A promise that resolves on success or rejects in case of an error.

### `joinRoom()`

Call this after successfully connecting with the server to join the room. Other participants' tracks will be sent and the user will be visible to other room participants.

Returns:
A promise that resolves on success or rejects in case of an error.

### `disconnect()`

Call this to gracefully disconnect from the server. After that you can connect again.

Returns:
A promise that resolves on success or rejects in case of an error.

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

## Credits

This project has been built and is maintained thanks to the support from [dscout](https://dscout.com/) and [Software Mansion](https://swmansion.com).

<img alt="dscout" height="100" src="./.github/dscout_logo.png"/>
<img alt="Software Mansion" src="https://logo.swmansion.com/logo?color=white&variant=desktop&width=150&tag=react-native-reanimated-github"/>
