import React, { useCallback, useState } from 'react';
import {
  View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, Pressable,
  Platform, Image,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import useIsOnline from '@/hooks/useIsOnline';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

const HITSLOP = {
  top: 20, bottom: 20, left: 20, right: 20,
};

const Android = Platform.OS === 'android';

const URI = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
// const URI = 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg';

const OnlineImageScreen = () => {
  const [inputText, setInput] = useState('');
  const [isValidImage, setValid] = useState(true);
  // const { isOnline } = useIsOnline();

  const onPaste = async (): Promise<void> => {
    if (inputText.length) {
      setInput('');
      return;
    }
    const text = await Clipboard.getStringAsync() || URI;
    setInput(text);
  };

  const ImageComponent = useCallback(() => (
    isValidImage
      ? (
        <Image
          onError={() => setValid(false)}
          resizeMode="contain"
          source={{ uri: inputText }}
          style={[styles.image, styles.shadow]}
        />
      )
      : <Text style={styles.errorText}>URL invalid!</Text>
  ), [inputText, isValidImage]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          editable={false}
          value={inputText}
          style={styles.input}
          placeholder="..."
        />
        <Pressable
          hitSlop={HITSLOP}
          onPress={onPaste}
          style={({ pressed }) => [styles.pasteButton, pressed && styles.op]}
        >
          <FontAwesome6 name="paste" size={24} color="black" />
        </Pressable>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            { inputText ? <ImageComponent /> : <Text>Paste image URL</Text> }
          </View>
          <View style={styles.container} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.bottomContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    minHeight: 10,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 'auto',
    flex: 1,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  pasteButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1ccc0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  op: { opacity: 0.7 },
  bottomContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#dfe4ea',
  },
  image: {
    padding: 15,
    height: '100%',
    width: '100%',
  },
  shadow: Android ? {
    elevation: 20,
    shadowColor: '#52006A',
  } : {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#dfe4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});

export default OnlineImageScreen;
