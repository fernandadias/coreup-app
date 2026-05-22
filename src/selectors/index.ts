import type { Session, Streak, WeekDay, WorkoutTemplate } from '../types';

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function isoDateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function getTodayWorkout(state: {
  workouts: WorkoutTemplate[];
  sessions: Session[];
}): WorkoutTemplate | null {
  if (state.workouts.length === 0) return null;
  const completed = state.sessions.filter((s) => s.completedAt);
  const last = completed[completed.length - 1];
  if (!last) return state.workouts[0];
  const lastIdx = state.workouts.findIndex((w) => w.id === last.workoutId);
  const nextIdx = lastIdx < 0 ? 0 : (lastIdx + 1) % state.workouts.length;
  return state.workouts[nextIdx];
}

export function getWeekProgress(
  state: { sessions: Session[]; workouts: WorkoutTemplate[] },
  now: Date = new Date(),
): WeekDay[] {
  const todayDow = now.getDay();
  const mondayOffset = (todayDow + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - mondayOffset);

  const days: WeekDay[] = [];
  const todayStr = isoDateOnly(now);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = isoDateOnly(d);
    const session = state.sessions.find((s) => s.completedAt && s.completedAt.slice(0, 10) === iso);
    const workout = session ? state.workouts.find((w) => w.id === session.workoutId) : null;
    days.push({
      dayLabel: DAY_LABELS[d.getDay()],
      date: iso,
      done: !!session,
      workoutLetter: workout?.letter ?? null,
      isToday: iso === todayStr,
      isRest: false,
    });
  }
  return days;
}

export function getWeekDoneCount(state: { sessions: Session[] }, now: Date = new Date()): number {
  const todayDow = now.getDay();
  const mondayOffset = (todayDow + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - mondayOffset);
  const mondayIso = isoDateOnly(monday);

  return state.sessions.filter((s) => {
    if (!s.completedAt) return false;
    return s.completedAt.slice(0, 10) >= mondayIso;
  }).length;
}

export function getTotalCompletedSessions(state: { sessions: Session[] }): number {
  return state.sessions.filter((s) => s.completedAt).length;
}

export function getTotalPRs(state: { sessions: Session[] }): number {
  let total = 0;
  for (const s of state.sessions) {
    for (const sets of Object.values(s.exerciseLogs)) {
      for (const set of sets) if (set.isPR) total++;
    }
  }
  return total;
}

export function getCurrentStreak(state: { streak: Streak }): number {
  return state.streak.current;
}

export function getActiveSession(state: { sessions: Session[] }): Session | null {
  return state.sessions.find((s) => !s.completedAt) ?? null;
}
