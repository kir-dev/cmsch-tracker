import { LocationObject } from 'expo-location';
import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

interface DataDisplayProps {
  location?: LocationObject;
  visible: boolean;
}

export function DataDisplay({ location, visible }: DataDisplayProps) {
  const gray = useThemeColor({}, 'border');
  return (
    <View style={[styles.container, { opacity: visible ? 1 : 0 }]}>
      <Text style={[styles.text, { color: gray }]}>Pontosság: {'~' + location?.coords.accuracy + 'm' ?? '-'}</Text>
      <Text style={[styles.text, { color: gray }]}>{location?.coords.latitude ?? '-'}°</Text>
      <Text style={[styles.text, { color: gray }]}>{location?.coords.longitude ?? '-'}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  text: { marginTop: 30, fontSize: 20, textAlign: 'center' },
});
