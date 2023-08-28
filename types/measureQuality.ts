export enum MeasureQuality {
  LOWEST = 1,
  LOW = 2,
  BALANCED = 3,
  HIGH = 4,
  HIGHEST = 5,
}

export const MeasureQualityLabels = {
  [MeasureQuality.LOWEST]: 'Pontatlan',
  [MeasureQuality.LOW]: 'Alacsony',
  [MeasureQuality.BALANCED]: 'Kiegyensúlyozott',
  [MeasureQuality.HIGH]: 'Magas',
  [MeasureQuality.HIGHEST]: 'Precíz',
};
