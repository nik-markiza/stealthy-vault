import { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Platform, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const Android = Platform.OS === 'android';

interface MetaData {
  extension: string,
  filePathName: string,
  fileName: string,
  modificationTime: string,
  fileSize: string,
  resolution: string,
  gpsLocation?: {
    latitude: string,
    longitude: string,
  } | string,
  cameraMake?: string,
  cameraModel?: string,
};

const LocalImageScreen : FC = () => {
  const [imageURI, setImageURI] = useState<null | string>(null);
  const [metadata, setMetadata] = useState<MetaData | null>(null);

  const router = useRouter();

  const onReset = () => {
    setImageURI(null);
    setMetadata(null);
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        onReset();
      }
    }, [])
  );

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
    })

    if (!image.canceled) {
      const { uri, width, height, fileName, fileSize, assetId } = image.assets[0];

      let modificationTime, exifData = null;
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });


      const extension = uri.split(".").pop() ?? 'Unknown';
      const asset = await MediaLibrary.getAssetInfoAsync(assetId || '');
      modificationTime = new Date(fileInfo.modificationTime * 1000).toLocaleString() ?? 'Unknown';

      if (asset) {
        exifData = asset.exif || null;
      }

      const metaData = {
        extension,
        filePathName: (uri.split("/").pop())?.replace(`.${extension}`, '') ?? 'Unknown',
        fileName: fileName ? fileName.replace(`.${extension}`, '') : 'Unknown',
        modificationTime: modificationTime ?? 'Unknown',
        fileSize: fileSize ? `${(fileSize / 1024).toFixed(2)} KB` : 'Unknown',
        resolution: width && height ? `${width} × ${height}` : 'Unknown',
        cameraMake: exifData?.Make || 'Unknown',
        cameraModel: exifData?.Model || 'Unknown',
        gpsLocation: exifData?.GPSLatitude
          ? { latitude: exifData.GPSLatitude, longitude: exifData.GPSLongitude }
          : 'No GPS data',
      }

      // console.log('FileSystem:', fileInfo);
      // console.log('ImagePicker:', image.assets[0]);
      // console.log('MediaLibrary:', asset);
      setImageURI(uri);
      setMetadata(metaData);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      {
        imageURI 
          ? <Image resizeMode='contain' style={[styles.image, styles.shadow]} source={{ uri: imageURI }}></Image>
          : <Text>No Local Image</Text>
      }
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
            style={({ pressed }) => [styles.button, pressed &&  styles.op7]}
            onPress={chooseImage}>
              <Text style={styles.text}>Choose Image</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, pressed &&  styles.op7]}
            onPress={onReset}>
              <Text style={styles.text}>Reset Image</Text>
          </Pressable>
      </View>
      <View style={styles.infoContainer}>
        {metadata && (
          <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollContaintainre}>
            <Text style={styles.infoText}>{`Name: ${metadata.fileName}`}</Text>
            <Text style={styles.infoText}>{`Date: ${metadata.modificationTime}`}</Text>
            <Text style={styles.infoText}>{`Extension: ${metadata.extension}`}</Text>
            <Text style={styles.infoText}>{`Size: ${metadata.fileSize}`}</Text>
            <Text style={styles.infoText}>{`Resolution: ${metadata.resolution}`}</Text>
            <Text style={styles.infoText}>{`Path name: ${metadata.filePathName}`}</Text>
            <Pressable style={{ backgroundColor: 'orange', paddingVertical: 10 }} onPress={() => router.push('/map')}>
              <Text style={styles.infoText}>{`Location: ${metadata.gpsLocation}`}</Text>
            </Pressable>
            <Text style={styles.infoText}>{`Camera make: ${metadata.cameraMake}`}</Text>
            <Text style={styles.infoText}>{`Camera model: ${metadata.cameraModel}`}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#dfe4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    padding: 15,
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  op7: {
    opacity: 0.7,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#f1f2f6',
  },
  infoText: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 2,
  },
  shadow: Android
    ? {
      elevation: 20,
      shadowColor: '#52006A',
    }
    : {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    scrollContaintainre: {
      flex: 1,
      marginBottom: 20,
    },
    contentContainer: {
      padding: 10 ,
    },
});

export default LocalImageScreen;