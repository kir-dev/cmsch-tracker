import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Linking, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

export function Impressum() {
  const gray = useThemeColor({}, 'secondaryText');
  const onClick = () => {
    Linking.openURL('https://berente.net/privacy/cmsch-tracker');
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: gray }}>
        Made with <MaterialCommunityIcons name='heart' size={15} color='red' /> by Kir-Dev
      </Text>
      <Text style={{ color: gray }}>CMSch Tracker v{Constants.expoConfig?.version}</Text>
      <Text onPress={onClick} style={{ color: gray, textDecorationLine: 'underline' }}>
        Adatvédelmi tájékoztató
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
