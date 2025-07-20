import { View, ViewProps, useColorScheme } from 'react-native';

type Props = ViewProps;

export function ThemedView({ style, ...rest }: Props) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
