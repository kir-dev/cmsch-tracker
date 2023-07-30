import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocationObject } from 'expo-location';
import { StyleSheet, View } from 'react-native';

import { LocationApiResponse } from '../types/locationResponse.type';
import { Text, TextProps, useThemeColor } from './Themed';

interface DataDisplayProps {
  apiResponse?: LocationApiResponse;
  location?: LocationObject;
  error?: Error;
  visible: boolean;
}

export function DataDisplay({ apiResponse, location, visible, error }: DataDisplayProps) {
  const red = useThemeColor({}, 'red');
  const green = useThemeColor({}, 'green');

  return (
    <View style={[styles.container, { opacity: visible ? 0.3 : 0 }]}>
      <DataRecord>Csoport: {apiResponse?.group ?? '-'}</DataRecord>
      <DataRecord>Státusz: {apiResponse?.status ?? '-'}</DataRecord>
      <DataRecord>
        Pontosság: {location?.coords.accuracy ? '~' + Math.floor(location.coords.accuracy) + 'm' : '-'}
      </DataRecord>
      <DataRecord>{location?.coords.latitude ?? '-'}°</DataRecord>
      <DataRecord>{location?.coords.longitude ?? '-'}°</DataRecord>
      <View style={styles.status}>
        <MaterialCommunityIcons
          name={error ? 'alert-circle-outline' : 'check-circle-outline'}
          size={25}
          color={error ? red : green}
        />
        <DataRecord style={{ color: error ? red : green, marginTop: 0 }}>
          {error ? 'Megosztás sikertelen' : 'Megosztás sikeres'}
        </DataRecord>
      </View>
    </View>
  );
}

function DataRecord({ style, ...props }: TextProps) {
  return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  text: { marginTop: 15, fontSize: 20, textAlign: 'center' },
  status: { flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 10 },
});
