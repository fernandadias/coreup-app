import { useCallback, useEffect, useRef, useState } from 'react';

interface UseRestTimerReturn {
  remainingSeconds: number;
  isRunning: boolean;
  start: (totalSeconds: number) => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  reset: () => void;
}

export function useRestTimer(onComplete?: () => void): UseRestTimerReturn {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clear, [clear]);

  const tick = useCallback(() => {
    setRemainingSeconds((s) => {
      if (s <= 1) {
        clear();
        setIsRunning(false);
        onCompleteRef.current?.();
        return 0;
      }
      return s - 1;
    });
  }, [clear]);

  const start = useCallback(
    (totalSeconds: number) => {
      clear();
      setRemainingSeconds(totalSeconds);
      setIsRunning(true);
      intervalRef.current = setInterval(tick, 1000);
    },
    [clear, tick],
  );

  const pause = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const resume = useCallback(() => {
    if (remainingSeconds <= 0) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [remainingSeconds, tick]);

  const skip = useCallback(() => {
    clear();
    setIsRunning(false);
    setRemainingSeconds(0);
    onCompleteRef.current?.();
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setIsRunning(false);
    setRemainingSeconds(0);
  }, [clear]);

  return { remainingSeconds, isRunning, start, pause, resume, skip, reset };
}
