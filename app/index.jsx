import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image source={require('./pomodor.png')} />
      <View style={styles.actions}>
        <Text style={styles.timer}>25:00</Text>
        <Pressable>
          <Text>Começar</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap: 40,
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#14448080',
    width: "80%",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
  },
  timer: {
    fontSize: 54,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#B872FF',
  }
});

