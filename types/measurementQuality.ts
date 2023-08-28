export enum MeasurementQuality {
  LOWEST = 1,
  LOW = 2,
  BALANCED = 3,
  HIGH = 4,
  HIGHEST = 5,
}

export const MeasureQualityLabels = {
  [MeasurementQuality.LOWEST]: 'Pontatlan',
  [MeasurementQuality.LOW]: 'Alacsony',
  [MeasurementQuality.BALANCED]: 'Kiegyensúlyozott',
  [MeasurementQuality.HIGH]: 'Magas',
  [MeasurementQuality.HIGHEST]: 'Precíz',
};
