import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  hasStartedLocationUpdatesAsync,
  LocationObject,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { LocationSubscriber } from '../types/locationSubscriber.type';
import { MeasurementQuality } from '../types/measurementQuality';
import {
  getDistanceIntervalForQuality,
  getTimeIntervalForQuality,
  MeasureQualityToLocationAccuracy,
} from '../utils/measurementQuality';

const LOCATION_TASK_NAME = 'background-location-task';

export class LocationTaskService {
  private subscribers: LocationSubscriber[];
  private readonly errorHandler: (e: Error) => void;
  private measurementQuality: MeasurementQuality = MeasurementQuality.BALANCED;

  constructor(onError?: (e: Error) => void) {
    this.subscribers = [];
    this.defineTask();
    this.errorHandler = onError ?? console.error;
  }

  setMeasurementQuality(quality: MeasurementQuality) {
    this.measurementQuality = quality;
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
        accuracy: MeasureQualityToLocationAccuracy[this.measurementQuality],
        timeInterval: getTimeIntervalForQuality(this.measurementQuality),
        distanceInterval: getDistanceIntervalForQuality(this.measurementQuality),
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'CMSch követés aktív',
          notificationBody: 'A felhasználók láthatják a helyzeted!',
        },
      });

      return this.isRunning();
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

  async refresh() {
    if (!(await this.isRunning())) return false;
    try {
      await this.stop();
      return await this.start();
    } catch (e) {
      return false;
    }
  }

  async isRunning() {
    try {
      return await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    } catch (e) {
      return false;
    }
  }
}
