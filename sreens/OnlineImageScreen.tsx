import { View, StyleSheet, Text } from "react-native";
import useIsOnline from "@/hooks/useIsOnline";

const OnlineImageScreen = () => {
  const { isOnline } = useIsOnline();

  return (
    <View style={styles.container}>
      <Text>{`Is online: ${isOnline}`}</Text>
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
