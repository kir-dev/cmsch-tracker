import { useRouter } from 'expo-router';
import { useState } from 'react';

import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { Content } from '../components/Content';
import { InputField } from '../components/form/InputField';
import { SliderField } from '../components/form/SliderField';
import { SwitchField } from '../components/form/SwitchField';
import { Impressum } from '../components/Impressum';
import { PasteBadge } from '../components/PasteBadge';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useSettingsContext } from '../components/SettingsContext';
import { TitleBar } from '../components/TitleBar';
import { MeasureQualityLabels } from '../utils/measurementQuality';
import { useSettingsSearchParams } from '../utils/useSettingsSearchParams';

export default function Settings() {
  const searchParams = useSettingsSearchParams();
  const {
    setKey,
    key,
    setEndpoint,
    endpoint,
    setMeasureQuality,
    measurementQuality,
    broadcastEnabled,
    setBroadcastEnabled,
  } = useSettingsContext();
  const [endpointValue, setEndpointValue] = useState(endpoint);
  const [keyValue, setKeyValue] = useState(key);
  const [measurementQualityValue, setMeasurementQualityValue] = useState(measurementQuality);
  const [broadcastEnabledValue, setBroadcastEnabledValue] = useState(broadcastEnabled);

  const { back } = useRouter();

  const onSave = () => {
    setEndpoint(endpointValue);
    setKey(keyValue);
    setMeasureQuality(measurementQualityValue);
    setBroadcastEnabled(broadcastEnabledValue);
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
        <SwitchField value={broadcastEnabledValue} onValueChange={setBroadcastEnabledValue} label='Közvetítés' />
        <SliderField
          value={measurementQualityValue}
          minimumValue={1}
          maximumValue={5}
          step={1}
          onValueChange={setMeasurementQualityValue}
          label='Mérés minősége'
          helperText={MeasureQualityLabels[measurementQualityValue]}
          iconBefore='circle-outline'
          iconAfter='circle-medium'
        />
        <Button onPress={onSave}>Mentés</Button>
      </Content>
      {showPasteBadge && <PasteBadge onPress={onPasteFromQueryParams} />}
      <Impressum />
    </Screen>
  );
}
