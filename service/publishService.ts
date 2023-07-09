import axios, { AxiosInstance } from 'axios';
import { LocationObject } from 'expo-location';

import { LocationSubscriber } from '../types/locationSubscriber.type';

export class PublishService implements LocationSubscriber {
  private axiosInstance: AxiosInstance;
  private endpoint: string | undefined;
  private key: string | undefined;

  constructor() {
    this.axiosInstance = axios.create();
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance.defaults.baseURL = endpoint;
    console.log(this.axiosInstance.defaults.baseURL);
  }

  setKey(key: string) {
    this.key = key;
    this.axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + key;
  }

  sendLocation({ coords: { accuracy, latitude, longitude } }: LocationObject) {
    this.axiosInstance.post('', { accuracy, latitude, longitude }).catch(console.error);
  }
}
