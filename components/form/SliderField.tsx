import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider, { SliderProps } from '@react-native-community/slider';
import { Platform, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '../Themed';
import { FormField } from './FormField';

interface SliderFieldProps extends SliderProps {
  iconBefore?: keyof (typeof MaterialCommunityIcons)['glyphMap'];
  iconAfter?: keyof (typeof MaterialCommunityIcons)['glyphMap'];
  label: string;
  helperText?: string;
}

export function SliderField({ label, style, helperText, iconAfter, iconBefore, ...props }: SliderFieldProps) {
  const trackColor = useThemeColor({}, 'theme');
  const thumbColor = Platform.OS === 'android' ? trackColor : 'white';
  return (
    <FormField label={label}>
      <View style={styles.sliderContainer}>
        {iconBefore && <MaterialCommunityIcons name={iconBefore} size={24} color='gray' />}
        <Slider
          style={[styles.slider, style]}
          minimumTrackTintColor={trackColor}
          thumbTintColor={thumbColor}
          {...props}
        />
        {iconAfter && <MaterialCommunityIcons name={iconAfter} size={24} color='gray' />}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </FormField>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: '100%',
  },
  slider: {
    flex: 1,
  },
  helperText: {
    color: 'gray',
    textAlign: 'center',
    width: '100%',
  },
});
