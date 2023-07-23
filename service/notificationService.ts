import * as Notifications from 'expo-notifications';
import { IosAuthorizationStatus } from 'expo-notifications';
import { Platform } from 'react-native';

export class NotificationService {
  private notificationId: string | undefined;
  private enabled: boolean = false;
  constructor() {
    if (Platform.OS === 'ios') this.setup();
  }

  async setup() {
    const { granted, ios } = await Notifications.getPermissionsAsync();

    if (!granted) {
      const { status } = await Notifications.requestPermissionsAsync();
      this.enabled = status === 'granted' || (ios?.status ?? 0) >= IosAuthorizationStatus.AUTHORIZED;
    } else {
      this.enabled = true;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  async show() {
    if (!this.enabled) return;
    await this.dismiss();
    this.notificationId = await Notifications.scheduleNotificationAsync({
      content: { title: 'CMSch követés aktív', body: 'A felhasználók láthatják a helyzeted!' },
      trigger: null,
    });
  }

  async dismiss() {
    if (!this.enabled) return;
    await Notifications.dismissAllNotificationsAsync();
  }
}
