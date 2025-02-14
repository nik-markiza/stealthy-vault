import { View, StyleSheet, Text } from "react-native";

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Map</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	}
});

export default MapScreen;