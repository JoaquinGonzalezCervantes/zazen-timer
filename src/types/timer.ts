export type SessionType = 'zazen' | 'complete';

export type PeriodType = 'preparation' | 'zazen' | 'kinhin';

export interface Period {
  type: PeriodType;
  // duration in seconds
  duration: number;
  // update interval in ms (e.g., 1000 for seconds, 60000 for minutes)
  updateInterval: number;
}

export type TimerSequence = Period[];
