import { View, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FC } from "react";
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const USER_LOCATION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen:  FC =  () => {
	const navigation = useNavigation();
  const { __EXPO_ROUTER_key, ...location } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} showsUserLocation initialRegion={USER_LOCATION}>
            <Marker coordinate={USER_LOCATION}></Marker>
          </MapView>
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },
  bottomContainer: {
    flex: 1,
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
