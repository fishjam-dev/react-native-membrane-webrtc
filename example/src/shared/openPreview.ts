import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermissionsAndOpenPreview = async (callback: Function) => {
  if (Platform.OS === 'ios') {
    callback();
    return;
  }
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
    callback();
  } catch (err) {
    console.warn(err);
  }
};
