import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';

type SettingsContextType = {
  endpoint: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  key: string;
  setKey: Dispatch<SetStateAction<string>>;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = '@cmsch-tracker';

SplashScreen.preventAutoHideAsync();

export function SettingsProvider({ children }: PropsWithChildren) {
  const [endpoint, setEndpoint] = useState<SettingsContextType['endpoint']>('');
  const [key, setKey] = useState<SettingsContextType['key']>('');
  const [storageLoading, setStorageLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const storedDataObject = JSON.parse(storedData);
          setEndpoint(storedDataObject.endpoint);
          setKey(storedDataObject.key);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData().finally(() => setStorageLoading(false));
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ endpoint, key }));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [endpoint, key]);

  useEffect(() => {
    if (!storageLoading) SplashScreen.hideAsync();
  }, [storageLoading]);

  if (storageLoading) return null;

  return (
    <SettingsContext.Provider
      value={{
        endpoint,
        setEndpoint,
        key,
        setKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('Settings context not found!');
  return context;
};
