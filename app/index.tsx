import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const DURATIONS = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
} as const;

export default function Index() {
  const [session, setSession] = useState<keyof typeof DURATIONS>("work");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setIsRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleStartPause = () => {
    if (timeLeft === 0) {
      resetTimer(session);
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = (type: keyof typeof DURATIONS) => {
    setSession(type);
    setTimeLeft(DURATIONS[type]);
    setIsRunning(false);
  };

  const cycleSession = () => {
    if (session === "work") {
      resetTimer("short");
    } else if (session === "short") {
      resetTimer("long");
    } else {
      resetTimer("work");
    }
  };

  const getImage = () => {
    if (session === "work") return require("./pomodor.png");
    if (session === "short") return require("./short.png");
    return require("./long.png");
  };

  return (
    <ThemedView style={styles.container}>
      <HelloWave />
      <Image source={getImage()} />
      <ThemedView style={styles.actions}>
        <ThemedText style={styles.timer}>
          {minutes}:{seconds}
        </ThemedText>
        <Pressable style={styles.button} onPress={handleStartPause}>
          <ThemedText>{isRunning ? "Pausar" : "Começar"}</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={() => resetTimer(session)}
        >
          <ThemedText>Resetar</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={cycleSession}
        >
          <ThemedText>Trocar</ThemedText>
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
  },
  secondary: {
    backgroundColor: '#6D28D9',
    marginTop: 12,
  },
});

