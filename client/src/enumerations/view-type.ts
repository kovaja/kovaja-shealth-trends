import HeartRate from '../components/heart-rate/HeartRate';

export enum ViewType {
  HeartRate = 'HeartRate',
  Sleep = 'Sleep'
}

export const ViewTypeLabel = {
  [ViewType.HeartRate]: 'Heart Rate',
  [ViewType.Sleep]: 'Sleep'
};

export const ViewTypeToComponet = {
  [ViewType.HeartRate]: HeartRate
};
