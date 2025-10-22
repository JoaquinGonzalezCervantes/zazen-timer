import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import type { Period, TimerSequence, SessionType } from '../types/timer';
import { ZAZEN_SEQUENCE, COMPLETE_ZAZEN_SEQUENCE } from '@constants/timerSequences';
import useBellSound from './useBellSound';

type TimerState = {
  currentPeriodIndex: number;
  remainingSeconds: number;
  isActive: boolean;
};

export function useTimer(sessionType: SessionType) {
  const sequence: TimerSequence = useMemo(
    () => (sessionType === 'zazen' ? ZAZEN_SEQUENCE : COMPLETE_ZAZEN_SEQUENCE),
    [sessionType]
  );

  const [state, setState] = useState<TimerState>(() => ({
    currentPeriodIndex: 0,
    remainingSeconds: sequence[0].duration,
    isActive: true
  }));

  const { playBell } = useBellSound();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef<number>(Date.now());
  const currentPeriod: Period = sequence[state.currentPeriodIndex];

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Kick a bell at the start of zazen and kinhin periods
  useEffect(() => {
    if (currentPeriod.type === 'zazen' || currentPeriod.type === 'kinhin') {
      playBell();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPeriodIndex]);

  useEffect(() => {
    clearTimer();
    if (!state.isActive) return;

    const step = currentPeriod.updateInterval === 60000 ? 60 : 1;
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsedSec = Math.max(1, Math.floor((now - lastTickRef.current) / 1000));
      lastTickRef.current = now;
      setState((prev: TimerState) => {
        const nextRemaining = prev.remainingSeconds - step;
        if (nextRemaining <= 0) {
          // Period finished
          // Play bell at end of zazen/kinhin
          if (currentPeriod.type === 'zazen' || currentPeriod.type === 'kinhin') {
            playBell();
          }

          const nextIndex = prev.currentPeriodIndex + 1;
          if (nextIndex >= sequence.length) {
            // Completed full sequence
            clearTimer();
            return { ...prev, remainingSeconds: 0, isActive: false };
          }
          const nextPeriod = sequence[nextIndex];
          return {
            currentPeriodIndex: nextIndex,
            remainingSeconds: nextPeriod.duration,
            isActive: true
          };
        }
        return { ...prev, remainingSeconds: nextRemaining };
      });
    }, currentPeriod.updateInterval);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPeriod.updateInterval, currentPeriod.type, state.isActive]);

  // Handle app state changes to correct drift on resume
  useEffect(() => {
    const handleChange = (status: AppStateStatus) => {
      if (status === 'active') {
        const now = Date.now();
        const elapsed = Math.floor((now - lastTickRef.current) / 1000);
        if (elapsed > 0) {
          setState((prev: TimerState) => {
            const remaining = Math.max(0, prev.remainingSeconds - elapsed);
            if (remaining === 0) {
              // force transition on next effect by marking inactive then active
              return { ...prev, remainingSeconds: 0 };
            }
            return { ...prev, remainingSeconds: remaining };
          });
          lastTickRef.current = now;
        }
      }
    };
    const sub = AppState.addEventListener('change', handleChange);
    return () => {
      sub.remove();
    };
  }, []);

  useEffect(() => () => clearTimer(), []);

  const stop = useCallback(() => {
    clearTimer();
  setState((prev: TimerState) => ({ ...prev, isActive: false }));
  }, []);

  const timeDisplay = useMemo(() => {
    if (currentPeriod.type === 'preparation') {
      return { value: state.remainingSeconds, unitKey: 'time.seconds' as const };
    }
    const minutes = Math.ceil(state.remainingSeconds / 60);
    return { value: minutes, unitKey: 'time.minutes' as const };
  }, [currentPeriod.type, state.remainingSeconds]);

  return {
    currentPeriod,
    currentPeriodIndex: state.currentPeriodIndex,
    remainingSeconds: state.remainingSeconds,
    isActive: state.isActive,
    timeDisplay,
    stop
  } as const;
}

export default useTimer;
