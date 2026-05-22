export type Tier = 'bronze' | 'silver' | 'gold';

export type Muscle = string;

export interface User {
  name: string;
  firstName: string;
  coach: string;
  plan: string;
  goal: string;
  startDate: string;
  weekGoal: number;
}

export interface Exercise {
  id: number;
  name: string;
  series: number;
  targetReps: string;
  targetLoadKg: number;
  restSeconds: number;
  previousLoadKg: number;
  muscle: Muscle;
}

export interface WorkoutTemplate {
  id: string;
  letter: string;
  name: string;
  durationMinutes: number;
  objetivos: string[];
  exercises: Exercise[];
}

export interface SetLog {
  setNumber: number;
  loadKg: number;
  reps: number;
  completedAt: string;
  isPR: boolean;
}

export interface Session {
  id: string;
  workoutId: string;
  startedAt: string;
  completedAt: string | null;
  exerciseLogs: Record<number, SetLog[]>;
}

export interface Streak {
  current: number;
  longest: number;
  lastSessionDate: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  tier: Tier;
  iconName: 'flame' | 'bolt' | 'target' | 'medal' | 'calendar';
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  target: number;
}

export interface Measurement {
  id: string;
  label: string;
  valueCm: number;
  delta: number;
  recordedAt: string;
}

export interface WeekDay {
  dayLabel: string;
  date: string;
  done: boolean;
  workoutLetter: string | null;
  isToday: boolean;
  isRest: boolean;
}

export interface PRDetection {
  exerciseId: number;
  exerciseName: string;
  previousLoadKg: number;
  newLoadKg: number;
}
