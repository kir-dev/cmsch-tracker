import { LocationObject } from 'expo-location';
import { useEffect, useRef, useState } from 'react';

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
import { LocationApiResponse } from '../types/locationResponse.type';

export default function Index() {
  const { endpoint, key } = useSettingsContext();

  const [state, setState] = useState(false);
  const [apiResponse, setApiResponse] = useState<LocationApiResponse>();
  const [location, setLocation] = useState<LocationObject>();

  const publishService = useRef(new PublishService(setApiResponse));
  const locationService = useRef(new LocationTaskService());
  const notificationService = useRef(new NotificationService());

  useEffect(() => {
    if (state) {
      locationService.current.start();
      notificationService.current.show();
    } else {
      locationService.current.stop();
      notificationService.current.dismiss();
    }
  }, [state]);

  useEffect(() => {
    locationService.current.addSubscriber(new LocationDisplayService(setLocation));
    locationService.current.addSubscriber(publishService.current);
  }, []);

  useEffect(() => {
    publishService.current.setKey(key);
  }, [key]);

  useEffect(() => {
    publishService.current.setEndpoint(endpoint);
  }, [endpoint]);

  const backgroundColor = useThemeColor({}, 'screenBackground');

  return (
    <Screen style={{ backgroundColor }}>
      <TitleBar>
        <ScreenTitle>B(e)acon</ScreenTitle>
        <SettingsButton />
      </TitleBar>
      <ToggleButton disabled={!key || !endpoint} state={state} onPress={() => setState((cs) => !cs)} />
      <DataDisplay apiResponse={apiResponse} location={location} visible={state} />
    </Screen>
  );
}
