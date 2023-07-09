import { useRouter } from 'expo-router';
import { useState } from 'react';

import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { Content } from '../components/Content';
import { InputField } from '../components/form/InputField';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useSettingsContext } from '../components/SettingsContext';
import { TitleBar } from '../components/TitleBar';

export default function Settings() {
  const { setKey, key, setEndpoint, endpoint } = useSettingsContext();
  const [endpointValue, setEndpointValue] = useState(endpoint);
  const [keyValue, setKeyValue] = useState(key);

  const { back } = useRouter();

  const onSave = () => {
    setEndpoint(endpointValue);
    setKey(keyValue);
    back();
  };
  return (
    <Screen>
      <TitleBar>
        <BackButton />
      </TitleBar>
      <ScreenTitle>Beállítások</ScreenTitle>
      <Content>
        <InputField
          autoCapitalize='none'
          value={endpointValue}
          onChangeText={setEndpointValue}
          label='Szerver végpont'
        />
        <InputField value={keyValue} onChangeText={setKeyValue} label='Azonosító' />
        <Button onPress={onSave}>Mentés</Button>
      </Content>
    </Screen>
  );
}
