import {
  Accuracy,
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  hasStartedLocationUpdatesAsync,
  LocationObject,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { LocationSubscriber } from '../types/locationSubscriber.type';

const LOCATION_TASK_NAME = 'background-location-task';

export class LocationTaskService {
  private subscribers: LocationSubscriber[];
  private readonly errorHandler: (e: Error) => void;

  constructor(onError?: (e: Error) => void) {
    this.subscribers = [];
    this.defineTask();
    this.errorHandler = onError ?? console.error;
  }

  addSubscriber(subscriber: LocationSubscriber) {
    this.subscribers.push(subscriber);
  }

  removeSubscriber(subscriber: LocationSubscriber) {
    this.subscribers.filter((sub) => sub != subscriber);
  }

  defineTask() {
    try {
      if (TaskManager.isTaskDefined(LOCATION_TASK_NAME)) return;
      TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
        const typedData = data as { locations?: LocationObject[] };
        if (error) {
          this.errorHandler(new Error(error.message));
          return;
        }
        const firstLocation = typedData.locations?.[0];
        if (firstLocation) {
          this.subscribers.forEach((sub) => sub.sendLocation(firstLocation));
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async unregisterTask() {
    await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
  }

  async start() {
    const { status: foregroundStatus } = await getForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') return false;

    const { status: backgroundStatus } = await getBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') return false;

    try {
      await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 50,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'CMSch Tracking',
          notificationBody: 'Követés folyamatban',
        },
      });

      return await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  async stop() {
    try {
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      return await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    } catch (e) {
      return false;
    }
  }
}
