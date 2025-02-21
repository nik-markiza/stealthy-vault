import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';

export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
    >
      <View style={{ width: '100%', height: 75 }} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
