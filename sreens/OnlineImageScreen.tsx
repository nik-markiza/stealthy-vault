import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, Pressable,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useIsOnline from '@/hooks/useIsOnline';

const HITSLOP = {
  top: 20, bottom: 20, left: 20, right: 20,
};

const OnlineImageScreen = () => {
  const [inputText, setInput] = useState('');

  const { isOnline } = useIsOnline();

  const onPaste = (): void => {
    if (inputText.length) {
      setInput('');
      return;
    }
    setInput('https://...jpg');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          editable={false}
          value={inputText}
          style={styles.input}
          placeholder="paste url"
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
          <Text>{`Is online: ${isOnline}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

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
    backgroundColor: '#dfe4ea',
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
});

export default OnlineImageScreen;
