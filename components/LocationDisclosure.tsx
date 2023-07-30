import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  PermissionResponse,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, View } from 'react-native';

import { Content } from './Content';
import { PermissionItem } from './PermissionItem';
import { Text, useThemeColor } from './Themed';

export function LocationDisclosureModal() {
  const red = useThemeColor({}, 'red');
  const [visible, setVisible] = useState(false);
  const [foregroundLocationPermission, setForegroundLocationPermission] = useState<PermissionResponse>();
  const [backgroundLocationPermission, setBackgroundLocationPermission] = useState<PermissionResponse>();

  const getPermissions = () => {
    getForegroundPermissionsAsync().then(setForegroundLocationPermission);
    getBackgroundPermissionsAsync().then(setBackgroundLocationPermission);
  };

  const askForegroundLocationPermissions = async () => {
    setForegroundLocationPermission(await requestForegroundPermissionsAsync());
  };

  const askBackgroundLocationPermissions = async () => {
    setBackgroundLocationPermission(await requestBackgroundPermissionsAsync());
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  useEffect(getPermissions, []);

  useEffect(() => {
    if (foregroundLocationPermission && backgroundLocationPermission) {
      setVisible(
        foregroundLocationPermission?.status !== 'granted' || backgroundLocationPermission?.status !== 'granted'
      );
    }
  }, [foregroundLocationPermission, backgroundLocationPermission]);

  const isSettingsActionNeeded =
    (foregroundLocationPermission?.status !== 'granted' && !foregroundLocationPermission?.canAskAgain) ||
    (backgroundLocationPermission?.status !== 'granted' && !backgroundLocationPermission?.canAskAgain);

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <Content>
          <Text style={styles.title}>Engedélyek</Text>
          <Text>Az alábbiak engedélyezése szükséges a tökéletes működéshez:</Text>
          {foregroundLocationPermission && (
            <PermissionItem
              permissionResponse={foregroundLocationPermission}
              onClick={askForegroundLocationPermissions}
              label='Helyzet előtérben'
            />
          )}
          {backgroundLocationPermission && (
            <PermissionItem
              permissionResponse={backgroundLocationPermission}
              onClick={askBackgroundLocationPermissions}
              label='Helyzet háttérben'
            />
          )}
          <Text
            onPress={() => Linking.openURL('https://berente.net/privacy/cmsch-tracker')}
            style={{ textDecorationLine: 'underline' }}
          >
            Adatvédelmi tájékoztató
          </Text>
          {isSettingsActionNeeded && (
            <>
              <Text style={{ color: red }}>
                Egy vagy több engedélyt nem sikerült megszerezni. Kérlek ellenőrizd a beállításokban!
              </Text>
              <Pressable onPress={openAppSettings}>
                <Text style={[styles.settingsLink, { color: red }]}>Ugrás a beállításokra</Text>
              </Pressable>
              <Pressable onPress={getPermissions}>
                <Text style={styles.settingsLink}>Ellenőrzés</Text>
              </Pressable>
            </>
          )}
        </Content>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingsLink: {
    textDecorationLine: 'underline',
  },
});
