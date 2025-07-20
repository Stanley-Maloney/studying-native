import { Linking, Pressable, PressableProps } from 'react-native';

interface Props extends PressableProps {
  href: string;
}

export function ExternalLink({ href, children, ...props }: Props) {
  const handlePress = () => {
    Linking.openURL(href).catch(() => {});
  };
  return (
    <Pressable onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
}
