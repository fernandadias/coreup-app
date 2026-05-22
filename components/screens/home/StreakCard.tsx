import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
  return (
    <View className="overflow-hidden rounded-card border border-line bg-bg-1 p-6">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-brand">
          Streak
        </Text>
        <Ionicons name="flame" size={16} color="#D4FF3A" />
      </View>
      <View className="mt-3 flex-row items-baseline">
        <Text className="font-display text-7xl leading-none tracking-display text-fg-0">
          {currentStreak}
        </Text>
        <Text className="ml-2 font-sans text-sm text-fg-1">
          {currentStreak === 1 ? 'dia seguido' : 'dias seguidos'}
        </Text>
      </View>
      {longestStreak > 0 && (
        <Text className="mt-2 font-sans text-xs text-fg-2">
          Recorde pessoal: {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
        </Text>
      )}
    </View>
  );
}
