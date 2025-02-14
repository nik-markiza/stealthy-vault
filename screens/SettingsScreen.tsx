import { View, StyleSheet, Text } from "react-native";

const SettingsScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Settings</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	}
});

export default SettingsScreen;