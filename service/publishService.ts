import axios, { isAxiosError } from 'axios';
import { LocationObject } from 'expo-location';

import { LocationApiResponse } from '../types/locationResponse.type';
import { LocationSubscriber } from '../types/locationSubscriber.type';

export class PublishService implements LocationSubscriber {
  private endpoint: string | undefined;
  private key: string | undefined;

  constructor(private onResponse: (responseData: LocationApiResponse) => void) {}

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  setKey(key: string) {
    this.key = key;
  }

  sendLocation({ coords: { accuracy = 0, latitude, longitude, altitude = 0 } }: LocationObject) {
    if (!this.endpoint || !this.key) throw new Error('Kulcs vagy végpont hiányzik');
    axios
      .post<LocationApiResponse>(
        this.endpoint,
        { accuracy, latitude, longitude, altitude, token: this.key },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        this.onResponse(res.data);
      })
      .catch((e) => {
        if (isAxiosError(e)) console.error(e);
      });
  }
}
