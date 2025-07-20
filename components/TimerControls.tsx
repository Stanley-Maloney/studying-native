import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  isRunning: boolean;
  onStartPause(): void;
  onReset(): void;
  onCycle(): void;
}

function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
}

const GradientButton = ({ label, onPress, colors }: { label: string; onPress: () => void; colors: string[] }) => (
  <Pressable
    onPress={() => {
      showToast(label === 'Começar' || label === 'Pausar' ? `Timer ${label.toLowerCase()}` : label);
      onPress();
    }}
    style={{ width: '100%' }}
  >
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </LinearGradient>
  </Pressable>
);

export default function TimerControls({ isRunning, onStartPause, onReset, onCycle }: Props) {
  return (
    <>
      <GradientButton
        label={isRunning ? 'Pausar' : 'Começar'}
        onPress={onStartPause}
        colors={['#B872FF', '#6D28D9']}
      />
      <GradientButton label="Resetar" onPress={onReset} colors={['#6D28D9', '#4B0082']} />
      <GradientButton label="Trocar" onPress={onCycle} colors={['#6D28D9', '#4B0082']} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
});
