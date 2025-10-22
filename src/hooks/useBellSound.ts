import { useEffect, useRef, useState, useCallback } from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
declare const require: any;

export function useBellSound() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        });
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/bell.mp3')
        );
        if (!mounted) return;
        soundRef.current = sound;
        setIsLoaded(true);
      } catch (e) {
        // Silently ignore if placeholder file is invalid; user can replace later
        setIsLoaded(false);
      }
    })();

    return () => {
      mounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const playBell = useCallback(async () => {
    try {
      if (!isLoaded || !soundRef.current) return;
      const status = (await soundRef.current.getStatusAsync()) as AVPlaybackStatusSuccess | any;
      if ('isLoaded' in status && status.isLoaded && 'positionMillis' in status) {
        if (status.positionMillis > 0) {
          await soundRef.current.setPositionAsync(0);
        }
        await soundRef.current.playAsync();
      }
    } catch {
      // noop
    }
  }, [isLoaded]);

  return { playBell, isLoaded };
}

export default useBellSound;
