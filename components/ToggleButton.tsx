import { AntDesign } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

interface ToggleButtonProps extends PressableProps {
  disabled?: boolean;
  state: boolean;
}

export function ToggleButton({ state, disabled = false, ...props }: ToggleButtonProps) {
  const red = useThemeColor({}, 'red');
  const green = useThemeColor({}, 'green');
  const gray = useThemeColor({}, 'border');
  let color = state ? green : red;
  if (disabled) color = gray;
  let text = 'Letiltva';
  if (!disabled) text = state ? 'Aktív' : 'Inaktív';
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={[styles.text, { color: gray }]}>
        {text}
      </Text>
      <Pressable style={[styles.button, { backgroundColor: color, shadowColor: color }]} {...props}>
        <AntDesign name='poweroff' color='white' size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 10 },
  text: { marginBottom: 30, fontSize: 30, textAlign: 'center' },
  button: {
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
});
