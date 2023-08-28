import { LocationAccuracy } from 'expo-location';

import { MeasurementQuality } from '../types/measurementQuality';

const DistanceIntervalBase = 15;
const TimeIntervalBase = 5000;

export const MeasureQualityLabels: Record<MeasurementQuality, string> = {
  [MeasurementQuality.LOWEST]: 'Pontatlan',
  [MeasurementQuality.LOW]: 'Alacsony',
  [MeasurementQuality.BALANCED]: 'Kiegyensúlyozott',
  [MeasurementQuality.HIGH]: 'Magas',
  [MeasurementQuality.HIGHEST]: 'Precíz',
};
export const MeasureQualityToLocationAccuracy: Record<MeasurementQuality, LocationAccuracy> = {
  [MeasurementQuality.LOWEST]: LocationAccuracy.Lowest,
  [MeasurementQuality.LOW]: LocationAccuracy.Low,
  [MeasurementQuality.BALANCED]: LocationAccuracy.Balanced,
  [MeasurementQuality.HIGH]: LocationAccuracy.High,
  [MeasurementQuality.HIGHEST]: LocationAccuracy.Highest,
};

export function getTimeIntervalForQuality(quality: MeasurementQuality): number {
  return (6 - quality) * TimeIntervalBase;
}

export function getDistanceIntervalForQuality(quality: MeasurementQuality): number {
  return (6 - quality) * DistanceIntervalBase;
}
