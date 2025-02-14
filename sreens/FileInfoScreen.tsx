import { View, Text, StyleSheet } from "react-native";

const FileInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>File Info</Text>
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

export default FileInfoScreen;