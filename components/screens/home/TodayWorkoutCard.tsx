import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { WorkoutTemplate } from '../../../src/types';

interface TodayWorkoutCardProps {
  workout: WorkoutTemplate;
  onStart: () => void;
}

export function TodayWorkoutCard({ workout, onStart }: TodayWorkoutCardProps) {
  return (
    <View className="rounded-card border border-line bg-bg-1 p-6">
      <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
        Treino de hoje
      </Text>
      <View className="mt-2 flex-row items-baseline">
        <Text className="font-display text-6xl leading-none tracking-display text-fg-0">
          {workout.letter}
        </Text>
        <Text className="ml-3 font-sans-medium text-lg text-fg-0">{workout.name}</Text>
      </View>
      <View className="mt-3 flex-row gap-4">
        <Text className="font-sans text-xs text-fg-1">
          {workout.exercises.length} exercícios
        </Text>
        <Text className="font-sans text-xs text-fg-1">{workout.durationMinutes} min</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onStart}
        className="mt-5 flex-row items-center justify-center gap-2 rounded-full bg-brand py-3 active:opacity-80">
        <Text className="font-sans-semibold text-sm text-bg-0">Iniciar treino</Text>
        <Ionicons name="arrow-forward" size={16} color="#09090B" />
      </Pressable>
    </View>
  );
}
