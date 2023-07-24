import { useRouter } from 'expo-router';
import { useState } from 'react';

import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { Content } from '../components/Content';
import { InputField } from '../components/form/InputField';
import { PasteBadge } from '../components/PasteBadge';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useSettingsContext } from '../components/SettingsContext';
import { TitleBar } from '../components/TitleBar';
import { useSettingsQueryParams } from '../utils/useSettingsQueryParams';

export default function Settings() {
  const queryParams = useSettingsQueryParams();

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
    if (queryParams.endpoint && typeof queryParams.endpoint === 'string') setEndpointValue(queryParams.endpoint);
    if (queryParams.key && typeof queryParams.key === 'string') setKeyValue(queryParams.key);
  };

  const showPasteBadge =
    (queryParams.endpoint || queryParams.key) &&
    (queryParams.key !== keyValue || queryParams.endpoint !== endpointValue);

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
    </Screen>
  );
}
