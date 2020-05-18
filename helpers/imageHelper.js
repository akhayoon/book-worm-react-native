import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const openImageLibary = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('sorry, we need camera roll permission');
    return false;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    base64: true
  });

  return !result.cancelled ? result : false;
}

export const openCamera = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
  if (status !== 'granted') {
    alert('sorry we need camera and camer roll permission');
    return false;
  }
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.1,
    base64: true,
    allowsEditing: Platform.os === 'ios' ? false : true,
    aspect: [4, 3]
  });
  return !result.cancelled ? result : false;
}

export const prepareBlob = async (imageUri) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xml = new XMLHttpRequest();
      // success resolve promise
      xml.onload = () => {
        resolve(xml.response);
      }

      // error reject
      xml.onerror = (e) => {
        console.log(e);
        reject(new TypeError('Image upload failed'));
      }
      // set response type to get the blob
      xml.responseType = 'blob';
      xml.open('GET', imageUri, true);
      // sent the request
      xml.send();
    });
    return blob;
  } catch (e) {
    console.log(e)
  }
}