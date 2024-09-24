export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
  forEach = "forEach",
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface MessageEntry {
  message: string | null;
  error: string | null;
}

export interface ActionEntry {
  payload: string | null;
  type: string;
}

export interface WeatherOption {
  value: Weather
  label: string
}

export interface VisibilityOption {
  value: Visibility
  label: string
}

export type DiaryContextType = {
  info: MessageEntry;
  successAction: (info: MessageEntry) => void;
  failAction: (info: MessageEntry) => void;
  cleanAction: (info: MessageEntry) => void;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
