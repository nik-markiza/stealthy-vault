import React, { FC } from 'react';
import {
  View, Text, StyleSheet, Image, Pressable, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import useImageMetadata from '@/hooks/useImageMetadata';
import { SafeAreaView } from 'react-native-safe-area-context';

const Android = Platform.OS === 'android';
const DISABLED_BUTTON = true;

const LocalImageScreen: FC = () => {
  const router = useRouter();
  const {
    imageURI, metadata, resetImage, chooseImage,
  } = useImageMetadata();

  const openMap = () => {
    router.push({
      pathname: '/map',
      params: metadata?.gpsLocation ?? {},
    });
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Pressable onPress={chooseImage} style={styles.imageContainer}>
        {
        imageURI
          ? <Image resizeMode="contain" style={[styles.image, styles.shadow]} source={{ uri: imageURI }} />
          : <Text style={{ fontSize: 24 }}>Press to choose image</Text>
        }
      </Pressable>
      {/* <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.op7]}
          onPress={chooseImage}
        >
          <Text style={styles.text}>Choose Image</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.op7]}
          onPress={resetImage}
        >
          <Text style={styles.text}>Reset Image</Text>
        </Pressable>
      </View> */}
      <View style={styles.infoContainer}>
        {metadata && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollContaintainre}
        >
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
            <Pressable
              onPress={openMap}
              style={({ pressed }) => [styles.mapButton, pressed && styles.op7]}
            >
              <Text style={styles.infoText}>{'Location: found. '}</Text>
              <Text style={[styles.infoText, { color: '#3742fa' }]}>Show on map?</Text>
              <Feather style={{ marginLeft: 5 }} name="map-pin" size={18} color="black" />
            </Pressable>
          )}
          {metadata.device && <Text style={styles.infoText}>{`Device: ${metadata.device} ${metadata.model} (${metadata.software})`}</Text>}
        </ScrollView>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          disabled={DISABLED_BUTTON}
          onPress={() => {}}
          style={({ pressed }) => [
            styles.button, pressed && styles.op7, DISABLED_BUTTON && styles.disabledButton
          ]}
        >
          <Text>Delete Metadata</Text>
        </Pressable>
        <Pressable
          disabled={DISABLED_BUTTON}
          onPress={() => {}}
          style={({ pressed }) => [
            styles.button, pressed && styles.op7, DISABLED_BUTTON && styles.disabledButton
          ]}
        >
          <Text>Save Metadate</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 350,
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
  },
  contentContainer: {
    padding: 10,
  },
  mapButton: {
    flexDirection: 'row',
  },
  mapText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  bottomContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#dfe4ea',
  },
  disabledButton: {
    backgroundColor: '#8395a7',
  },
});

export default LocalImageScreen;
