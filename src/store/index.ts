import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  SEED_ACHIEVEMENTS,
  SEED_MEASUREMENTS,
  SEED_USER,
  SEED_WORKOUTS,
} from '../seed/initial';
import type {
  Achievement,
  Measurement,
  PRDetection,
  Session,
  SetLog,
  Streak,
  User,
  WorkoutTemplate,
} from '../types';

interface StoreState {
  user: User;
  workouts: WorkoutTemplate[];
  sessions: Session[];
  streak: Streak;
  achievements: Achievement[];
  measurements: Measurement[];

  _hasHydrated: boolean;
}

interface StoreActions {
  startSession: (workoutId: string) => string;
  logSet: (sessionId: string, exerciseId: number, set: Omit<SetLog, 'completedAt' | 'isPR'>) => SetLog;
  completeSession: (sessionId: string) => { newStreak: number; prs: PRDetection[] };
  cancelSession: (sessionId: string) => void;
  reset: () => void;
}

export type Store = StoreState & StoreActions;

const INITIAL_STREAK: Streak = { current: 0, longest: 0, lastSessionDate: null };

function isoDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

function daysBetween(aDate: string, bDate: string): number {
  const a = Date.UTC(+aDate.slice(0, 4), +aDate.slice(5, 7) - 1, +aDate.slice(8, 10));
  const b = Date.UTC(+bDate.slice(0, 4), +bDate.slice(5, 7) - 1, +bDate.slice(8, 10));
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

function recomputeStreak(prev: Streak, sessionDate: string): Streak {
  const last = prev.lastSessionDate;
  if (!last) {
    const current = 1;
    return { current, longest: Math.max(prev.longest, current), lastSessionDate: sessionDate };
  }
  const gap = daysBetween(last, sessionDate);
  if (gap === 0) return prev;
  const current = gap === 1 ? prev.current + 1 : 1;
  return {
    current,
    longest: Math.max(prev.longest, current),
    lastSessionDate: sessionDate,
  };
}

function recomputeAchievements(
  achievements: Achievement[],
  ctx: { streak: Streak; completedSessions: number; totalPRs: number; weekDoneCount: number },
  now: string,
): Achievement[] {
  return achievements.map((a) => {
    let progress = a.progress;
    if (a.id.startsWith('streak-')) progress = ctx.streak.current;
    else if (a.id === 'first-workout' || a.id.startsWith('workouts-')) progress = ctx.completedSessions;
    else if (a.id.startsWith('pr-')) progress = ctx.totalPRs;
    else if (a.id === 'week-goal') progress = ctx.weekDoneCount;
    else if (a.id === 'year') progress = ctx.streak.longest;

    const shouldUnlock = !a.unlocked && progress >= a.target;
    return shouldUnlock
      ? { ...a, progress, unlocked: true, unlockedAt: now }
      : { ...a, progress };
  });
}

function countSessionsInLast7Days(sessions: Session[], from: string): number {
  return sessions.filter((s) => {
    if (!s.completedAt) return false;
    const gap = daysBetween(isoDateOnly(s.completedAt), from);
    return gap >= 0 && gap < 7;
  }).length;
}

function previousBestForExercise(sessions: Session[], exerciseId: number, excludeSessionId: string): number {
  let best = 0;
  for (const s of sessions) {
    if (s.id === excludeSessionId) continue;
    if (!s.completedAt) continue;
    const sets = s.exerciseLogs[exerciseId];
    if (!sets) continue;
    for (const set of sets) if (set.loadKg > best) best = set.loadKg;
  }
  return best;
}

function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: SEED_USER,
      workouts: SEED_WORKOUTS,
      sessions: [],
      streak: INITIAL_STREAK,
      achievements: SEED_ACHIEVEMENTS,
      measurements: SEED_MEASUREMENTS,
      _hasHydrated: false,

      startSession: (workoutId) => {
        const session: Session = {
          id: makeId('sess'),
          workoutId,
          startedAt: new Date().toISOString(),
          completedAt: null,
          exerciseLogs: {},
        };
        set((state) => ({ sessions: [...state.sessions, session] }));
        return session.id;
      },

      logSet: (sessionId, exerciseId, partial) => {
        const completedAt = new Date().toISOString();
        const state = get();
        const session = state.sessions.find((s) => s.id === sessionId);
        const sessionBestSoFar =
          session?.exerciseLogs[exerciseId]?.reduce((m, x) => Math.max(m, x.loadKg), 0) ?? 0;
        const historicalBest = previousBestForExercise(state.sessions, exerciseId, sessionId);
        const isPR = partial.loadKg > historicalBest && partial.loadKg > sessionBestSoFar;
        const setLog: SetLog = { ...partial, completedAt, isPR };

        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id !== sessionId
              ? sess
              : {
                  ...sess,
                  exerciseLogs: {
                    ...sess.exerciseLogs,
                    [exerciseId]: [...(sess.exerciseLogs[exerciseId] ?? []), setLog],
                  },
                },
          ),
        }));

        return setLog;
      },

      completeSession: (sessionId) => {
        const state = get();
        const session = state.sessions.find((s) => s.id === sessionId);
        if (!session) return { newStreak: state.streak.current, prs: [] };

        const completedAt = new Date().toISOString();
        const sessionDate = isoDateOnly(completedAt);
        const newStreak = recomputeStreak(state.streak, sessionDate);

        const prs: PRDetection[] = [];
        const workout = state.workouts.find((w) => w.id === session.workoutId);
        for (const [exIdStr, sets] of Object.entries(session.exerciseLogs)) {
          const exerciseId = Number(exIdStr);
          const topSet = sets.reduce<SetLog | null>(
            (best, s) => (best == null || s.loadKg > best.loadKg ? s : best),
            null,
          );
          if (!topSet?.isPR) continue;
          const exercise = workout?.exercises.find((e) => e.id === exerciseId);
          if (!exercise) continue;
          prs.push({
            exerciseId,
            exerciseName: exercise.name,
            previousLoadKg: exercise.previousLoadKg,
            newLoadKg: topSet.loadKg,
          });
        }

        const updatedSessions = state.sessions.map((s) =>
          s.id === sessionId ? { ...s, completedAt } : s,
        );
        const completedCount = updatedSessions.filter((s) => s.completedAt).length;
        const totalPRs = updatedSessions.reduce((sum, s) => {
          let count = 0;
          for (const sets of Object.values(s.exerciseLogs)) for (const x of sets) if (x.isPR) count++;
          return sum + count;
        }, 0);
        const weekDoneCount = countSessionsInLast7Days(updatedSessions, sessionDate);

        const updatedAchievements = recomputeAchievements(
          state.achievements,
          { streak: newStreak, completedSessions: completedCount, totalPRs, weekDoneCount },
          completedAt,
        );

        set({
          sessions: updatedSessions,
          streak: newStreak,
          achievements: updatedAchievements,
        });

        return { newStreak: newStreak.current, prs };
      },

      cancelSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
        }));
      },

      reset: () => {
        set({
          user: SEED_USER,
          workouts: SEED_WORKOUTS,
          sessions: [],
          streak: INITIAL_STREAK,
          achievements: SEED_ACHIEVEMENTS,
          measurements: SEED_MEASUREMENTS,
        });
      },
    }),
    {
      name: 'coreup-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        sessions: state.sessions,
        streak: state.streak,
        achievements: state.achievements,
        measurements: state.measurements,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
      version: 1,
    },
  ),
);
