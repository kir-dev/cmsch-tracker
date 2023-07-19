import { LocationObject } from 'expo-location';
import { StyleSheet, View } from 'react-native';

import { LocationApiResponse } from '../types/locationResponse.type';
import { Text, TextProps } from './Themed';

interface DataDisplayProps {
  apiResponse?: LocationApiResponse;
  location?: LocationObject;
  visible: boolean;
}

export function DataDisplay({ apiResponse, location, visible }: DataDisplayProps) {
  return (
    <View style={[styles.container, { opacity: visible ? 0.3 : 0 }]}>
      <DataRecord>Csoport: {apiResponse?.group ?? '-'}</DataRecord>
      <DataRecord>Státusz: {apiResponse?.status ?? '-'}</DataRecord>
      <DataRecord>Pontosság: {'~' + location?.coords.accuracy + 'm' ?? '-'}</DataRecord>
      <DataRecord>{location?.coords.latitude ?? '-'}°</DataRecord>
      <DataRecord>{location?.coords.longitude ?? '-'}°</DataRecord>
    </View>
  );
}

function DataRecord({ style, ...props }: TextProps) {
  return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  text: { marginTop: 30, fontSize: 20, textAlign: 'center' },
});
