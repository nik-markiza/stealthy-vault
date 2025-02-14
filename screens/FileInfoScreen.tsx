import { View, StyleSheet, Text } from "react-native";

const FileInfoScreen = () => {
	return (
		<View style={styles.container}>
			<Text>FileInfo</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	}
});

export default FileInfoScreen;