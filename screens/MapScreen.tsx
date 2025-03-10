import React, { FC, useMemo } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_LOCATION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapScreen: FC = () => {
  const navigation = useNavigation();
  const { __EXPO_ROUTER_key, latitude, longitude } = useLocalSearchParams();

  const region = useMemo(() => {
    const lat = Number(latitude);
    const lon = Number(longitude);

    return !Number.isNaN(lat) && !Number.isNaN(lon)
      ? {
        latitude: lat, longitude: lon, latitudeDelta: 0.01, longitudeDelta: 0.01,
      }
      : DEFAULT_LOCATION;
  }, [latitude, longitude]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} showsUserLocation initialRegion={region}>
            <Marker coordinate={region} />
          </MapView>
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Go Back" onPress={goBack} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },
  bottomContainer: {
    height: 70,
    backgroundColor: '#dfe4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
