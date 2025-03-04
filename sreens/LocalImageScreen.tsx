import React, { FC } from 'react';
import {
  View, Text, StyleSheet, Image, Pressable, Platform, ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import useImageMetadata from '@/hooks/useImageMetadata';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync } from 'expo-image-manipulator';
import * as Sharing from 'expo-sharing';

const Android = Platform.OS === 'android';

const LocalImageScreen: FC = () => {
  const router = useRouter();
  const { imageURI, metadata, chooseImage } = useImageMetadata();

  const openMap = () => {
    router.push({
      pathname: '/map',
      params: metadata?.gpsLocation ?? {},
    });
  };

  const onDelete = async (): Promise<void> => {
    if (imageURI) {
      try {
        const manipulatedImage = await manipulateAsync(
          imageURI,
          [],
          { compress: 1, format: 'jpeg' },
        );
        const asset = await MediaLibrary.createAssetAsync(manipulatedImage.uri);
        await MediaLibrary.createAlbumAsync('MyApp', asset, false);
      } catch (error) {
        console.error('EXIF delete error:', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      const message = `${metadata}`;
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(message);
      } else {
        Alert.alert('Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error sharing message: ', error);
    }
  };

  const DISABLED_BUTTON = !metadata;

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Pressable onPress={chooseImage} style={styles.imageContainer}>
        {
        imageURI
          ? <Image resizeMode="contain" style={[styles.image, styles.shadow]} source={{ uri: imageURI }} />
          : <Text style={{ fontSize: 24 }}>Press to choose image</Text>
        }
      </Pressable>
      <View style={styles.infoContainer}>
        {metadata && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollContaintainre}
        >
          <Text style={styles.infoText}>{`Name: ${metadata.fileName}`}</Text>
          {metadata.originalDate && <Text style={styles.infoText}>{`Original date: ${metadata.originalDate}`}</Text>}
          <Text style={styles.infoText}>{`Extension: ${metadata.extension}`}</Text>
          <Text style={styles.infoText}>{`Size: ${metadata.fileSize}`}</Text>
          {metadata.resolution && <Text style={styles.infoText}>{`Resolution: ${metadata.resolution}`}</Text>}
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.infoText}>{'Path name: '}</Text>
            <View style={styles.pathContainer}>
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
              <Feather style={styles.featherIcon} name="map-pin" size={18} color="black" />
            </Pressable>
          )}
          {metadata.device && <Text style={styles.infoText}>{`Device: ${metadata.device} ${metadata.model} (${metadata.software})`}</Text>}
        </ScrollView>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          disabled={DISABLED_BUTTON}
          onPress={onDelete}
          style={({ pressed }) => [
            styles.button, pressed && styles.op7, DISABLED_BUTTON && styles.disabledButton,
          ]}
        >
          <Text>Delete Metadata</Text>
        </Pressable>
        <Pressable
          disabled={DISABLED_BUTTON}
          onPress={handleShare}
          style={({ pressed }) => [
            styles.button, pressed && styles.op7, DISABLED_BUTTON && styles.disabledButton,
          ]}
        >
          <Text>Share Metadate</Text>
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
  op7: { opacity: 0.7 },
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
  scrollContaintainre: { flex: 1 },
  contentContainer: { padding: 10 },
  mapButton: { flexDirection: 'row' },
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
  featherIcon: { marginLeft: 5 },
  pathContainer: {
    flexShrink: 1,
    justifyContent: 'center',
  },
});

export default LocalImageScreen;
