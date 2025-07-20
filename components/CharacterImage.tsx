import React, { useEffect, useRef } from 'react';
import { Animated, ImageSourcePropType, StyleSheet } from 'react-native';

interface Props {
  source: ImageSourcePropType;
}

export default function CharacterImage({ source }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [source, opacity]);

  return (
    <Animated.Image source={source} style={[styles.image, { opacity }]} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#ddd',
  },
});
