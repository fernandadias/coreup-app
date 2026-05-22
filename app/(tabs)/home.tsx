import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StreakCard } from '../../components/screens/home/StreakCard';
import { TodayWorkoutCard } from '../../components/screens/home/TodayWorkoutCard';
import { WeekProgressGrid } from '../../components/screens/home/WeekProgressGrid';
import {
  getActiveSession,
  getTodayWorkout,
  getWeekProgress,
} from '../../src/selectors';
import { useStore } from '../../src/store';

export default function HomeScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const workouts = useStore((s) => s.workouts);
  const sessions = useStore((s) => s.sessions);
  const streak = useStore((s) => s.streak);

  const today = getTodayWorkout({ workouts, sessions });
  const week = getWeekProgress({ sessions, workouts });
  const active = getActiveSession({ sessions });

  const targetWorkout = active
    ? workouts.find((w) => w.id === active.workoutId) ?? today
    : today;

  const handleStart = () => {
    if (!targetWorkout) return;
    router.push({
      pathname: '/execute/[workoutId]',
      params: { workoutId: targetWorkout.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
            Olá, {user.firstName}
          </Text>
          <Text className="mt-1 font-display italic text-5xl leading-none tracking-display text-fg-0">
            Bora treinar
          </Text>
        </View>

        <View className="mt-6 gap-4 px-6">
          <StreakCard currentStreak={streak.current} longestStreak={streak.longest} />
          {targetWorkout && (
            <TodayWorkoutCard workout={targetWorkout} onStart={handleStart} />
          )}
          <WeekProgressGrid days={week} weekGoal={user.weekGoal} />
        </View>

        {active && (
          <View className="mx-6 mt-4 rounded-card-sm border border-brand/40 bg-brand/10 p-4">
            <Text className="font-sans-medium text-xs text-brand">
              Treino em andamento — toque em &quot;Iniciar treino&quot; pra continuar.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
