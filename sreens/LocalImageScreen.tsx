import { View, Text, StyleSheet } from "react-native";

const LocalFileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Local File</Text>
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

export default LocalFileScreen;