import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const ProfileScreen : FC = () => (
  <View style={styles.container} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
