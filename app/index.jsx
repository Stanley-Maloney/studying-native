import { Image, Pressable, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <HelloWave />
      <Image source={require('./pomodor.png')} />
      <ThemedView style={styles.actions}>
        <ThemedText style={styles.timer}>25:00</ThemedText>
        <Pressable style={styles.button}>
          <ThemedText>Começar</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
  }
});

