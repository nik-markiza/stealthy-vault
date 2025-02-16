import { View, Text, StyleSheet } from "react-native";

const OnlineImageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Onlin eImage</Text>
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

export default OnlineImageScreen;
