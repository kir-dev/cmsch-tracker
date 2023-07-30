import { useRouter } from 'expo-router';
import { useState } from 'react';

import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { Content } from '../components/Content';
import { InputField } from '../components/form/InputField';
import { Impressum } from '../components/Impressum';
import { PasteBadge } from '../components/PasteBadge';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useSettingsContext } from '../components/SettingsContext';
import { TitleBar } from '../components/TitleBar';
import { useSettingsSearchParams } from '../utils/useSettingsSearchParams';

export default function Settings() {
  const searchParams = useSettingsSearchParams();
  const { setKey, key, setEndpoint, endpoint } = useSettingsContext();
  const [endpointValue, setEndpointValue] = useState(endpoint);
  const [keyValue, setKeyValue] = useState(key);

  const { back } = useRouter();

  const onSave = () => {
    setEndpoint(endpointValue);
    setKey(keyValue);
    back();
  };

  const onPasteFromQueryParams = () => {
    if (searchParams.endpoint && typeof searchParams.endpoint === 'string') setEndpointValue(searchParams.endpoint);
    if (searchParams.key && typeof searchParams.key === 'string') setKeyValue(searchParams.key);
  };

  const showPasteBadge =
    (searchParams.endpoint && searchParams.endpoint !== endpointValue) ||
    (searchParams.key && searchParams.key !== keyValue);

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
      {showPasteBadge && <PasteBadge onPress={onPasteFromQueryParams} />}
      <Impressum />
    </Screen>
  );
}
