import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View } from 'react-native';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => (
  <DrawerContentScrollView {...props} scrollEnabled={false}>
    <View style={{ width: '100%', height: 75 }} />
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

export default CustomDrawerContent;
