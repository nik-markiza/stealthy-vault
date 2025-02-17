import { StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
