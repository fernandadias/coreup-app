import {
  Genos_700Bold,
  Genos_700Bold_Italic,
  useFonts as useGenos,
} from '@expo-google-fonts/genos';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '../global.css';
import { useStore } from '../src/store';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [genosLoaded] = useGenos({ Genos_700Bold, Genos_700Bold_Italic });
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const hasHydrated = useStore((s) => s._hasHydrated);

  const ready = genosLoaded && interLoaded && hasHydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090B' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="execute/[workoutId]"
          options={{ presentation: 'modal', gestureEnabled: false }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
