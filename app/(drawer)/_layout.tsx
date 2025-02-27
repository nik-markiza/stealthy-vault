import React from 'react';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';

const SCREEN_OPTIONS = {
  drawerHideStatusBarOnOpen: true,
  drawerActiveTintColor: '#1e272e',
  drawerActiveBackgroundColor: '#7ed6df',
  drawerLabelStyle: {
    fontSize: 22,
    letterSpacing: 2,
  },
  drawerItemStyle: {
    borderRadius: 5,
    marginBottom: 5,
  },
  headerTitleStyle: {
    letterSpacing: 2,
    fontSize: 22,
  },
} as DrawerNavigationOptions;

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={SCREEN_OPTIONS}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Local Image', drawerLabel: 'Local Image' }}
      />
      <Drawer.Screen
        name="onlineimage"
        options={{ title: 'Online Image' }}
      />
      <Drawer.Screen
        name="localfile"
        options={{ title: 'Local File' }}
      />
      <Drawer.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
    </Drawer>
  );
}
