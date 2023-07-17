import { LocationObject } from 'expo-location';
import { useEffect, useState } from 'react';

import { DataDisplay } from '../components/DataDisplay';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { SettingsButton } from '../components/SettingsButton';
import { useSettingsContext } from '../components/SettingsContext';
import { useThemeColor } from '../components/Themed';
import { TitleBar } from '../components/TitleBar';
import { ToggleButton } from '../components/ToggleButton';
import { LocationDisplayService } from '../service/locationDisplayService';
import { LocationTaskService } from '../service/locationTaskService';
import { NotificationService } from '../service/notificationService';
import { PublishService } from '../service/publishService';

const locationService = new LocationTaskService();
const publishService = new PublishService();
const notificationService = new NotificationService();

export default function Index() {
  const { endpoint, key } = useSettingsContext();

  const [state, setState] = useState(false);
  const [location, setLocation] = useState<LocationObject>();

  useEffect(() => {
    if (state) {
      locationService.start();
      notificationService.show();
    } else {
      locationService.stop();
      notificationService.dismiss();
    }
  }, [state]);

  useEffect(() => {
    locationService.addSubscriber(new LocationDisplayService(setLocation));
    locationService.addSubscriber(publishService);
  }, []);

  useEffect(() => {
    publishService.setKey(key);
  }, [key]);

  useEffect(() => {
    publishService.setEndpoint(endpoint);
  }, [endpoint]);

  const backgroundColor = useThemeColor({}, 'screenBackground');

  return (
    <Screen style={{ backgroundColor }}>
      <TitleBar>
        <ScreenTitle>B(e)acon</ScreenTitle>
        <SettingsButton />
      </TitleBar>
      <ToggleButton disabled={!key || !endpoint} state={state} onPress={() => setState((cs) => !cs)} />
      <DataDisplay location={location} visible={state} />
    </Screen>
  );
}
