import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

interface PasteBadgeProps extends Partial<LinearGradientProps> {
  onPress: () => void;
}

export function PasteBadge({ onPress, style, start, end, colors, ...props }: PasteBadgeProps) {
  const startColor = useThemeColor({ light: '#ffa1ad' }, 'red');
  const endColor = useThemeColor({ light: '#bfe5fa' }, 'blue');

  const text = useThemeColor({}, 'primaryText');

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={[styles.container, style]}
        start={start ?? { x: 0, y: 0.5 }}
        end={end ?? { x: 1, y: 0.5 }}
        colors={colors ?? [startColor, endColor]}
        {...props}
      >
        <MaterialCommunityIcons name='magic-staff' size={30} color={text} />
        <View style={styles.textLayout}>
          <Text style={styles.mainText} numberOfLines={1}>
            Beállítások beillesztése
          </Text>
          <Text style={styles.secondaryText}>Woosh!</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textLayout: {
    flex: 1,
  },
  mainText: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
  },
  secondaryText: {
    opacity: 0.7,
  },
  container: {
    margin: 10,
    padding: 20,
    borderRadius: 20,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
