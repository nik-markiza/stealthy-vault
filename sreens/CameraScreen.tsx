import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const CameraScreen : FC = () => (
  <View style={styles.container} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
