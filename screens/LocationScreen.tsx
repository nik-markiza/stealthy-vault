import { View, StyleSheet, Text } from "react-native";

const LocationScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Location</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	}
});

export default LocationScreen;