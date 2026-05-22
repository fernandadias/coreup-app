import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WorkoutListItem } from '../../components/screens/workouts/WorkoutListItem';
import {
  getTodayWorkout,
  getTotalCompletedSessions,
  getWeekDoneCount,
} from '../../src/selectors';
import { useStore } from '../../src/store';
import type { Session } from '../../src/types';

function formatLastDone(sessions: Session[], workoutId: string): string | null {
  const matching = sessions
    .filter((s) => s.workoutId === workoutId && s.completedAt)
    .sort((a, b) => (a.completedAt! < b.completedAt! ? 1 : -1));
  if (matching.length === 0) return null;

  const lastIso = matching[0].completedAt!;
  const last = new Date(lastIso);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (24 * 60 * 60 * 1000));

  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem`;
  return `há ${Math.floor(diffDays / 30)} meses`;
}

export default function WorkoutsScreen() {
  const router = useRouter();
  const workouts = useStore((s) => s.workouts);
  const sessions = useStore((s) => s.sessions);

  const today = getTodayWorkout({ workouts, sessions });
  const weekDone = getWeekDoneCount({ sessions });
  const total = getTotalCompletedSessions({ sessions });

  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
            Treinos
          </Text>
          <Text className="mt-1 font-display italic text-5xl leading-none tracking-display text-fg-0">
            Split ABCD
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3 px-6">
          <View className="flex-1 rounded-card-sm border border-line bg-bg-1 p-4">
            <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
              Semana
            </Text>
            <Text className="mt-1 font-display text-3xl tracking-display text-fg-0">
              {weekDone}
            </Text>
          </View>
          <View className="flex-1 rounded-card-sm border border-line bg-bg-1 p-4">
            <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
              Total
            </Text>
            <Text className="mt-1 font-display text-3xl tracking-display text-fg-0">
              {total}
            </Text>
          </View>
        </View>

        <View className="mt-5 gap-3 px-6">
          {workouts.map((w) => (
            <WorkoutListItem
              key={w.id}
              workout={w}
              isToday={today?.id === w.id}
              lastDoneLabel={formatLastDone(sessions, w.id)}
              onPress={() =>
                router.push({
                  pathname: '/execute/[workoutId]',
                  params: { workoutId: w.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
