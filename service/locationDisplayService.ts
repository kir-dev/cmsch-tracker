import { LocationObject } from 'expo-location';

import { LocationSubscriber } from '../types/locationSubscriber.type';

export class LocationDisplayService implements LocationSubscriber {
  constructor(private callback: (location: LocationObject) => void) {}

  sendLocation(location: LocationObject) {
    this.callback(location);
  }
}
