import { useState } from 'react';
import { Region } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

interface MetaData {
  extension: string,
  filePathName: string,
  fileName: string,
  originalDate: string | null,
  modificationDate: string | null,
  fileSize: string | null,
  resolution: string,
  gpsLocation: Region | null,
  device: string | null,
  model: string | null,
  software: string | null,
  text: string,
}

const useImageMetadata = () => {
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const resetImage = () => {
    setImageURI(null);
    setMetadata(null);
  };

  const recognizeText = () => {
    setProcessing(true);

    setProcessing(false);
  };

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required.');
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
      exif: true,
      legacy: true,
    });

    if (!image.canceled) {
      const {
        uri, width, height, fileName, fileSize, exif,
      } = image.assets[0];

      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
      if (!fileInfo.exists || fileInfo.isDirectory) {
        return;
      }

      const extension = uri.split('.').pop() ?? 'Unknown';
      const originalDate = exif?.DateTime || null;
      const modificationTime = fileInfo?.modificationTime
        ? new Date(fileInfo.modificationTime * 1000).toLocaleString()
        : null;

      const filePathName = (uri.split('/').pop())?.replace(`.${extension}`, '') ?? 'Unknown';
      const newFileName = fileName ? fileName.replace(`.${extension}`, '') : 'Unknown';
      const newFileSize = fileSize ? `${(fileSize / 1024).toFixed(2)} KB` : null;
      const resolution = width && height ? `${width} × ${height}` : 'Unknown';
      const device = exif?.Make || null;
      const model = exif?.Model || null;
      const gpsLocation = exif?.GPSLatitude
        ? {
          latitude: exif.GPSLatitude,
          longitude: exif.GPSLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
        : null;
      const software = exif?.Software || null;

      const metaData = {
        extension,
        filePathName,
        fileName: newFileName,
        originalDate,
        modificationDate: modificationTime,
        fileSize: newFileSize,
        resolution,
        device,
        model,
        gpsLocation,
        software,
        text: '',
      };

      recognizeText();
      setImageURI(uri);
      setMetadata(metaData);
    }
  };

  return {
    imageURI, metadata, isProcessing, chooseImage, resetImage,
  };
};

export default useImageMetadata;
