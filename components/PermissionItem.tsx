import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PermissionResponse } from 'expo-location';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from './Themed';

interface PermissionItemProps {
  permissionResponse: PermissionResponse;
  onClick: () => void;
  label: string;
}

export function PermissionItem({ permissionResponse, onClick, label }: PermissionItemProps) {
  const green = useThemeColor({}, 'green');
  const blue = useThemeColor({}, 'blue');
  const red = useThemeColor({}, 'red');
  let iconName: ComponentProps<typeof MaterialCommunityIcons>['name'] = 'shield-check-outline';
  let color = green;
  if (permissionResponse.status !== 'granted') {
    iconName = 'shield-alert-outline';
    color = permissionResponse.canAskAgain ? blue : red;
  }
  let clickable = permissionResponse.status !== 'granted' && permissionResponse.canAskAgain;
  return (
    <Pressable onPress={onClick}>
      <View style={styles.container}>
        <MaterialCommunityIcons size={25} name={iconName} color={color} />
        <Text style={{ color, textDecorationLine: clickable ? 'underline' : 'none' }}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
