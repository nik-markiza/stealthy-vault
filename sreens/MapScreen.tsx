import { View, StyleSheet, Button } from "react-native";
import { useNavigation } from "expo-router";

const MapScreen = () => {
	const navigation = useNavigation();

  return (
    <View style={styles.container}>
			<Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MapScreen;
