import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { Text, useThemeColor } from '../Themed';
import { FormField } from './FormField';

interface InputFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
}

export function InputField({ label, style, helperText, ...props }: InputFieldProps) {
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'primaryText');
  return (
    <FormField label={label}>
      <TextInput style={[styles.input, { borderColor: border, color: text }, style]} {...props} />
      {helperText && <Text style={{ color: text }}>{helperText}</Text>}
    </FormField>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});
