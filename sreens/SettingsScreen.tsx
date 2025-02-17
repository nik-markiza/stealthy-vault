import { StyleSheet, View, Text, Pressable } from 'react-native';
import { observer } from "mobx-react-lite";
import { filesStore } from '../stores/filesStore'

const SettingsScreen = observer(() => {
  const increment = () => {
    filesStore.increment();
  }

  const decrement = () => {
    filesStore.decrement();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Files counter: ${filesStore.count}`}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={increment} 
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.text}>More</Text>
        </Pressable>
        <Pressable
          onPress={decrement}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.text}>Less</Text>
        </Pressable>
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 28,
    color: '#2d3436',
    fontWeight: '600',
  }
});

export default SettingsScreen;
