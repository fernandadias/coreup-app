import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseBlock } from '../../components/screens/execute/ExerciseBlock';
import { PRToast } from '../../components/screens/execute/PRToast';
import { RestTimerBar } from '../../components/screens/execute/RestTimerBar';
import { useRestTimer } from '../../src/hooks/useRestTimer';
import { useStore } from '../../src/store';
import type { PRDetection, Session } from '../../src/types';

export default function ExecuteScreen() {
  const router = useRouter();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  const workouts = useStore((s) => s.workouts);
  const sessions = useStore((s) => s.sessions);
  const startSession = useStore((s) => s.startSession);
  const logSetAction = useStore((s) => s.logSet);
  const completeSessionAction = useStore((s) => s.completeSession);
  const cancelSession = useStore((s) => s.cancelSession);

  const workout = useMemo(
    () => workouts.find((w) => w.id === workoutId),
    [workouts, workoutId],
  );

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [prs, setPRs] = useState<PRDetection[]>([]);
  const [activeRestSeconds, setActiveRestSeconds] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || !workout) return;
    startedRef.current = true;
    const existing = sessions.find((s) => !s.completedAt && s.workoutId === workout.id);
    if (existing) {
      setSessionId(existing.id);
    } else {
      const id = startSession(workout.id);
      setSessionId(id);
    }
  }, [workout, sessions, startSession]);

  const rest = useRestTimer();

  const session: Session | undefined = sessionId
    ? sessions.find((s) => s.id === sessionId)
    : undefined;

  const totalSets = workout?.exercises.reduce((sum, e) => sum + e.series, 0) ?? 0;
  const doneSets = session
    ? Object.values(session.exerciseLogs).reduce((sum, arr) => sum + arr.length, 0)
    : 0;
  const allDone = totalSets > 0 && doneSets >= totalSets;

  const handleSetComplete = (
    exerciseId: number,
    setNumber: number,
    loadKg: number,
    reps: number,
    restSeconds: number,
  ) => {
    if (!sessionId) return;
    logSetAction(sessionId, exerciseId, { setNumber, loadKg, reps });
    setActiveRestSeconds(restSeconds);
    rest.start(restSeconds);
  };

  const handleFinish = () => {
    if (!sessionId) return;
    const { prs: detected } = completeSessionAction(sessionId);
    setPRs(detected);
    rest.reset();
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, detected.length > 0 ? 1800 : 200);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar treino?',
      'Os sets já registrados serão descartados.',
      [
        { text: 'Continuar treinando', style: 'cancel' },
        {
          text: 'Cancelar',
          style: 'destructive',
          onPress: () => {
            if (sessionId) cancelSession(sessionId);
            router.back();
          },
        },
      ],
    );
  };

  if (!workout) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-0">
        <Text className="font-sans text-fg-0">Treino não encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <View className="flex-row items-center justify-between px-6 pb-2 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar treino"
          onPress={handleCancel}
          className="h-9 w-9 items-center justify-center rounded-full bg-bg-1">
          <Ionicons name="close" size={18} color="#FAFAFA" />
        </Pressable>
        <View className="items-center">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
            Treino {workout.letter}
          </Text>
          <Text className="font-sans-semibold text-sm text-fg-0">{workout.name}</Text>
        </View>
        <View className="items-end">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
            Sets
          </Text>
          <Text className="font-sans-semibold text-sm text-fg-0">
            {doneSets}/{totalSets}
          </Text>
        </View>
      </View>

      <View className="mx-6 mt-1 h-1 overflow-hidden rounded-full bg-bg-2">
        <View
          className="h-full bg-brand"
          style={{ width: `${totalSets ? (doneSets / totalSets) * 100 : 0}%` }}
        />
      </View>

      <PRToast prs={prs} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}>
        {workout.objetivos.length > 0 && (
          <View className="mx-6 mb-4 rounded-card-sm border border-line bg-bg-1 p-4">
            <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
              Objetivos
            </Text>
            <View className="mt-2 gap-1">
              {workout.objetivos.map((o) => (
                <Text key={o} className="font-sans text-sm text-fg-1">
                  · {o}
                </Text>
              ))}
            </View>
          </View>
        )}

        <View className="gap-4 px-6">
          {workout.exercises.map((ex) => (
            <ExerciseBlock
              key={ex.id}
              exercise={ex}
              sets={session?.exerciseLogs[ex.id] ?? []}
              onCompleteSet={(loadKg, reps, setNumber) =>
                handleSetComplete(ex.id, setNumber, loadKg, reps, ex.restSeconds)
              }
            />
          ))}
        </View>

        {allDone && (
          <View className="mx-6 mt-6">
            <Pressable
              accessibilityRole="button"
              onPress={handleFinish}
              className="flex-row items-center justify-center gap-2 rounded-full bg-brand py-4 active:opacity-80">
              <Ionicons name="checkmark-circle" size={20} color="#09090B" />
              <Text className="font-sans-semibold text-base text-bg-0">
                Concluir treino
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {rest.remainingSeconds > 0 && (
        <View className="absolute bottom-0 left-0 right-0">
          <RestTimerBar
            remainingSeconds={rest.remainingSeconds}
            totalSeconds={activeRestSeconds}
            isRunning={rest.isRunning}
            onPause={rest.pause}
            onResume={rest.resume}
            onSkip={rest.skip}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
