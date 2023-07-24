import * as Linking from 'expo-linking';

export function useSettingsQueryParams() {
  const url = Linking.useURL();
  if (url) {
    const { queryParams } = Linking.parse(url);
    return { endpoint: queryParams?.endpoint, key: queryParams?.key };
  }
  return { endpoint: undefined, key: undefined };
}
