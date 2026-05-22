import { Text, View } from 'react-native';

import type { WeekDay } from '../../../src/types';

interface WeekProgressGridProps {
  days: WeekDay[];
  weekGoal: number;
}

export function WeekProgressGrid({ days, weekGoal }: WeekProgressGridProps) {
  const done = days.filter((d) => d.done).length;

  return (
    <View className="rounded-card border border-line bg-bg-1 p-6">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
          Semana
        </Text>
        <Text className="font-sans text-xs text-fg-1">
          {done}/{weekGoal}
        </Text>
      </View>
      <View className="mt-4 flex-row justify-between">
        {days.map((d) => (
          <View key={d.date} className="items-center">
            <View
              className={[
                'mb-2 h-10 w-10 items-center justify-center rounded-full border',
                d.done
                  ? 'border-brand bg-brand'
                  : d.isToday
                    ? 'border-brand bg-bg-2'
                    : 'border-line bg-bg-2',
              ].join(' ')}>
              <Text
                className={[
                  'font-sans-semibold text-xs',
                  d.done ? 'text-bg-0' : d.isToday ? 'text-brand' : 'text-fg-2',
                ].join(' ')}>
                {d.workoutLetter ?? '·'}
              </Text>
            </View>
            <Text
              className={[
                'font-sans text-[10px] uppercase tracking-[0.1em]',
                d.isToday ? 'text-brand' : 'text-fg-2',
              ].join(' ')}>
              {d.dayLabel}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
