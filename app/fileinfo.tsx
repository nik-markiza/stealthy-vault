import { View, Text, StyleSheet } from "react-native";

export default function FileInfoScreen() {

	return (
		<View style={styles.container}>
			<Text>FileInfo Screen</Text>
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