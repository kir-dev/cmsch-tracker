import { StyleSheet, View } from 'react-native';

import { useThemeColor, ViewProps } from './Themed';

interface ContentProps extends ViewProps {}

export function Content({ style, ...props }: ContentProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');
  return <View style={[styles.container, { backgroundColor }, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },
});
