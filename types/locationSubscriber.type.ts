import { LocationObject } from 'expo-location';

export interface LocationSubscriber {
  sendLocation: (location: LocationObject) => void;
}
