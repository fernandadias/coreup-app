import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { WorkoutTemplate } from '../../../src/types';

interface WorkoutListItemProps {
  workout: WorkoutTemplate;
  isToday: boolean;
  lastDoneLabel: string | null;
  onPress: () => void;
}

export function WorkoutListItem({
  workout,
  isToday,
  lastDoneLabel,
  onPress,
}: WorkoutListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={[
        'rounded-card border bg-bg-1 p-5 active:opacity-80',
        isToday ? 'border-brand' : 'border-line',
      ].join(' ')}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View
            className={[
              'h-12 w-12 items-center justify-center rounded-full',
              isToday ? 'bg-brand' : 'bg-bg-2',
            ].join(' ')}>
            <Text
              className={[
                'font-display text-2xl tracking-display',
                isToday ? 'text-bg-0' : 'text-fg-0',
              ].join(' ')}>
              {workout.letter}
            </Text>
          </View>
          <View>
            <Text className="font-sans-semibold text-base text-fg-0">{workout.name}</Text>
            <Text className="mt-0.5 font-sans text-xs text-fg-1">
              {workout.exercises.length} exercícios · {workout.durationMinutes} min
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#52525B" />
      </View>
      {(isToday || lastDoneLabel) && (
        <View className="mt-3 flex-row items-center gap-2">
          {isToday && (
            <View className="rounded-full bg-brand px-2 py-0.5">
              <Text className="font-sans-semibold text-[9px] uppercase tracking-[0.15em] text-bg-0">
                Hoje
              </Text>
            </View>
          )}
          {lastDoneLabel && (
            <Text className="font-sans text-xs text-fg-2">Último: {lastDoneLabel}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
