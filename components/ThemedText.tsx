import { Text, TextProps, useColorScheme } from 'react-native';

type Props = TextProps & { type?: 'title' | 'subtitle' | 'link' };

export function ThemedText({ type, style, ...rest }: Props) {
  const colorScheme = useColorScheme();
  let extraStyle = {} as any;
  if (type === 'title') {
    extraStyle = { fontSize: 20, fontWeight: 'bold' };
  } else if (type === 'subtitle') {
    extraStyle = { fontSize: 16, fontWeight: '600' };
  } else if (type === 'link') {
    extraStyle = { color: colorScheme === 'dark' ? '#4B91F7' : '#1E3A8A' };
  }
  return <Text style={[extraStyle, style]} {...rest} />;
}
