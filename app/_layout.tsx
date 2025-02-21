import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="(drawer)">
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="map" options={{ title: 'Map', headerShown: false }} />
    </Stack>
  );
}
