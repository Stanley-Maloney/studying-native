import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';

import CharacterImage from '@/components/CharacterImage';
import TimerBox from '@/components/TimerBox';
import TimerControls from '@/components/TimerControls';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

const DURATIONS = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
} as const;

export default function Index() {
  const [session, setSession] = useState<keyof typeof DURATIONS>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Inter_400Regular,
  });

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

  if (!fontsLoaded) {
    return null;
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const total = DURATIONS[session];

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
    if (session === 'work') {
      resetTimer('short');
    } else if (session === 'short') {
      resetTimer('long');
    } else {
      resetTimer('work');
    }
  };

  const getImage = () => {
    if (session === 'work') return require('./pomodor.png');
    if (session === 'short') return require('./short.png');
    return require('./long.png');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}> 
        <HelloWave />
        <CharacterImage source={getImage()} />
        <TimerBox time={`${minutes}:${seconds}`} progress={timeLeft / total} isRunning={isRunning} />
        <TimerControls
          isRunning={isRunning}
          onStartPause={handleStartPause}
          onReset={() => resetTimer(session)}
          onCycle={cycleSession}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safe: {
    alignItems: 'center',
    gap: 32,
    width: '100%',
    paddingHorizontal: 20,
  },
});
