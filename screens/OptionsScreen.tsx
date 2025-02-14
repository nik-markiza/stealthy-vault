import { View, StyleSheet, Text } from "react-native";

const OptionsScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Options</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	}
});

export default OptionsScreen;