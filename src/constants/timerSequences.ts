import type { TimerSequence } from '../types/timer';

export const ZAZEN_SEQUENCE: TimerSequence = [
  { type: 'preparation', duration: 20, updateInterval: 1000 },
  { type: 'zazen', duration: 30 * 60, updateInterval: 60000 }
];

export const COMPLETE_ZAZEN_SEQUENCE: TimerSequence = [
  { type: 'preparation', duration: 20, updateInterval: 1000 },
  { type: 'zazen', duration: 30 * 60, updateInterval: 60000 },
  { type: 'kinhin', duration: 5 * 60, updateInterval: 60000 },
  { type: 'preparation', duration: 20, updateInterval: 1000 },
  { type: 'zazen', duration: 30 * 60, updateInterval: 60000 }
];
