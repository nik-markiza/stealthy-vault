import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const HomeScreen: FC = () => (
  <View style={styles.container} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
