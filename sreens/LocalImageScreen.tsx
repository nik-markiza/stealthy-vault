import { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Platform, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Region } from "react-native-maps";
import Feather from '@expo/vector-icons/Feather';

const Android = Platform.OS === 'android';

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

  const openMap = () => {
    // router.push('/map')
    router.push({
      pathname: "/map",
      params: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      // params: { ...metadata.gpsLocation },
    })
  }

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
    })

    if (!image.canceled) {
      const { uri, width, height, fileName, fileSize, exif } = image.assets[0];

      const extension = uri.split(".").pop() ?? 'Unknown';
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
      
      const originalDate = exif?.DateTime || null;
      const modificationTime = new Date(fileInfo?.modificationTime * 1000)?.toLocaleString() || null;

      const metaData = {
        extension,
        filePathName: (uri.split("/").pop())?.replace(`.${extension}`, '') ?? 'Unknown',
        fileName: fileName ? fileName.replace(`.${extension}`, '') : 'Unknown',
        originalDate: originalDate,
        modificationDate: modificationTime,
        fileSize: fileSize ? `${(fileSize / 1024).toFixed(2)} KB` : null,
        resolution: width && height ? `${width} × ${height}` : 'Unknown',
        device: exif?.Make || null,
        model: exif?.Model || null,
        gpsLocation: exif?.GPSLatitude
          ? { 
              latitude: exif.GPSLatitude,
              longitude: exif.GPSLongitude,
            } 
          : null,
        software: exif?.Software || null
      }

      // console.log('exif:', exif);
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
            {metadata.originalDate && <Text style={styles.infoText}>{`Original date: ${metadata.originalDate}`}</Text>}
            <Text style={styles.infoText}>{`Modificatio Date: ${metadata.modificationDate}`}</Text>
            <Text style={styles.infoText}>{`Extension: ${metadata.extension}`}</Text>
            <Text style={styles.infoText}>{`Size: ${metadata.fileSize}`}</Text>
            {metadata.resolution && <Text style={styles.infoText}>{`Resolution: ${metadata.resolution}`}</Text>}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.infoText}>{'Path name: '}</Text>
              <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.infoText, { paddingBottom: 2 }]}>{`${metadata.filePathName}`}</Text>
              </View>
            </View>
            {metadata.gpsLocation && (
              <Pressable style={({ pressed })=> [styles.mapButton, pressed && styles.op7]} onPress={openMap}>
                <Text style={styles.infoText}>{'Location: found. '}</Text>
                <Text style={[styles.infoText, {color: '#3742fa'}]}>{'Show on map?'}</Text>
                <Feather style={{ marginLeft: 5 }} name="map-pin" size={18} color="black" />
              </Pressable>
            )} 
            {metadata.device && <Text style={styles.infoText}>{`Device: ${metadata.device} ${metadata.model} (${metadata.software})`}</Text>}
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
    paddingBottom: 4,
  },
  shadow: Android
    ? {
      elevation: 20,
      shadowColor: '#52006A',
    }
    : {
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
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
    mapButton: {
      flexDirection: 'row',
    },
    mapText: {
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: "#000"
    }
});

export default LocalImageScreen;