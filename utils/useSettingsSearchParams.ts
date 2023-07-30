import { useLocalSearchParams } from 'expo-router';

export function useSettingsSearchParams() {
  const params = useLocalSearchParams();

  return { endpoint: params.endpoint, key: params.key };
}
