import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface RestTimerBarProps {
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
}

function format(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

export function RestTimerBar({
  remainingSeconds,
  totalSeconds,
  isRunning,
  onPause,
  onResume,
  onSkip,
}: RestTimerBarProps) {
  const progress = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;

  return (
    <View className="border-t border-line bg-bg-1 px-6 pb-6 pt-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-brand">
            Descanso
          </Text>
          <Text className="font-display text-4xl leading-none tracking-display text-fg-0">
            {format(remainingSeconds)}
          </Text>
        </View>
        <View className="flex-row gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isRunning ? 'Pausar' : 'Continuar'}
            onPress={isRunning ? onPause : onResume}
            className="h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-2 active:opacity-80">
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={16}
              color="#FAFAFA"
            />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pular descanso"
            onPress={onSkip}
            className="h-11 items-center justify-center rounded-full bg-brand px-4 active:opacity-80">
            <Text className="font-sans-semibold text-sm text-bg-0">Pular</Text>
          </Pressable>
        </View>
      </View>
      <View className="mt-3 h-1 overflow-hidden rounded-full bg-bg-2">
        <View
          className="h-full bg-brand"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </View>
    </View>
  );
}
