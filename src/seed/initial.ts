import type { Achievement, Measurement, User, WorkoutTemplate } from '../types';

export const SEED_USER: User = {
  name: 'Joaquina da Silva',
  firstName: 'Joaquina',
  coach: 'Nanda Dias',
  plan: 'Redução de % de gordura · Split ABC',
  goal: 'Redução de % de gordura',
  startDate: 'Out 2025',
  weekGoal: 5,
};

export const SEED_WORKOUTS: WorkoutTemplate[] = [
  {
    id: 'A',
    letter: 'A',
    name: 'Peito + Tríceps',
    durationMinutes: 55,
    objetivos: ['Foco em supino reto', 'Pegada fechada no tríceps'],
    exercises: [
      { id: 101, name: 'Supino reto', series: 4, targetReps: '8-10', targetLoadKg: 60, restSeconds: 120, previousLoadKg: 57.5, muscle: 'Peito' },
      { id: 102, name: 'Supino inclinado halteres', series: 3, targetReps: '10-12', targetLoadKg: 22, restSeconds: 90, previousLoadKg: 20, muscle: 'Peito' },
      { id: 103, name: 'Crucifixo máquina', series: 3, targetReps: '12-15', targetLoadKg: 30, restSeconds: 60, previousLoadKg: 30, muscle: 'Peito' },
      { id: 104, name: 'Crossover polia', series: 3, targetReps: '12-15', targetLoadKg: 15, restSeconds: 60, previousLoadKg: 15, muscle: 'Peito' },
      { id: 105, name: 'Tríceps pulley', series: 4, targetReps: '10-12', targetLoadKg: 25, restSeconds: 60, previousLoadKg: 22.5, muscle: 'Tríceps' },
      { id: 106, name: 'Tríceps francês', series: 3, targetReps: '10-12', targetLoadKg: 18, restSeconds: 60, previousLoadKg: 18, muscle: 'Tríceps' },
      { id: 107, name: 'Tríceps coice', series: 3, targetReps: '12', targetLoadKg: 8, restSeconds: 45, previousLoadKg: 8, muscle: 'Tríceps' },
    ],
  },
  {
    id: 'B',
    letter: 'B',
    name: 'Costas + Bíceps',
    durationMinutes: 58,
    objetivos: ['Foco na contração excêntrica', 'Manter FC acima de 130 bpm'],
    exercises: [
      { id: 201, name: 'Puxada frente', series: 4, targetReps: '10-12', targetLoadKg: 45, restSeconds: 90, previousLoadKg: 42.5, muscle: 'Dorsal' },
      { id: 202, name: 'Remada curvada', series: 4, targetReps: '8-10', targetLoadKg: 50, restSeconds: 120, previousLoadKg: 50, muscle: 'Dorsal' },
      { id: 203, name: 'Remada unilateral', series: 3, targetReps: '10-12', targetLoadKg: 22, restSeconds: 90, previousLoadKg: 20, muscle: 'Dorsal' },
      { id: 204, name: 'Pullover máquina', series: 3, targetReps: '12-15', targetLoadKg: 35, restSeconds: 60, previousLoadKg: 35, muscle: 'Dorsal' },
      { id: 205, name: 'Rosca direta barra W', series: 4, targetReps: '10-12', targetLoadKg: 20, restSeconds: 60, previousLoadKg: 17.5, muscle: 'Bíceps' },
      { id: 206, name: 'Rosca martelo', series: 3, targetReps: '12', targetLoadKg: 14, restSeconds: 60, previousLoadKg: 14, muscle: 'Bíceps' },
      { id: 207, name: 'Rosca scott', series: 3, targetReps: '10-12', targetLoadKg: 15, restSeconds: 60, previousLoadKg: 15, muscle: 'Bíceps' },
    ],
  },
  {
    id: 'C',
    letter: 'C',
    name: 'Pernas + Ombros',
    durationMinutes: 65,
    objetivos: ['Profundidade no agachamento', 'Ombro: amplitude controlada'],
    exercises: [
      { id: 301, name: 'Agachamento livre', series: 4, targetReps: '8-10', targetLoadKg: 70, restSeconds: 150, previousLoadKg: 67.5, muscle: 'Quadríceps' },
      { id: 302, name: 'Leg press 45°', series: 4, targetReps: '10-12', targetLoadKg: 140, restSeconds: 120, previousLoadKg: 135, muscle: 'Quadríceps' },
      { id: 303, name: 'Cadeira extensora', series: 3, targetReps: '12-15', targetLoadKg: 45, restSeconds: 60, previousLoadKg: 45, muscle: 'Quadríceps' },
      { id: 304, name: 'Mesa flexora', series: 3, targetReps: '12-15', targetLoadKg: 35, restSeconds: 60, previousLoadKg: 32.5, muscle: 'Posterior' },
      { id: 305, name: 'Panturrilha em pé', series: 4, targetReps: '15-20', targetLoadKg: 60, restSeconds: 45, previousLoadKg: 60, muscle: 'Panturrilha' },
      { id: 306, name: 'Desenvolvimento halteres', series: 4, targetReps: '8-10', targetLoadKg: 14, restSeconds: 90, previousLoadKg: 12, muscle: 'Ombro' },
      { id: 307, name: 'Elevação lateral', series: 3, targetReps: '12-15', targetLoadKg: 8, restSeconds: 45, previousLoadKg: 8, muscle: 'Ombro' },
      { id: 308, name: 'Elevação frontal', series: 3, targetReps: '12', targetLoadKg: 7, restSeconds: 45, previousLoadKg: 7, muscle: 'Ombro' },
    ],
  },
  {
    id: 'D',
    letter: 'D',
    name: 'Cardio + Core',
    durationMinutes: 35,
    objetivos: ['HIIT 20 min', 'Core estável sob fadiga'],
    exercises: [
      { id: 401, name: 'Esteira HIIT (1:1)', series: 8, targetReps: '30s', targetLoadKg: 12, restSeconds: 30, previousLoadKg: 12, muscle: 'Cardio' },
      { id: 402, name: 'Prancha', series: 3, targetReps: '45s', targetLoadKg: 0, restSeconds: 45, previousLoadKg: 0, muscle: 'Core' },
      { id: 403, name: 'Abdominal supra', series: 3, targetReps: '20', targetLoadKg: 0, restSeconds: 45, previousLoadKg: 0, muscle: 'Core' },
      { id: 404, name: 'Russian twist', series: 3, targetReps: '20', targetLoadKg: 4, restSeconds: 45, previousLoadKg: 4, muscle: 'Core' },
      { id: 405, name: 'Mountain climber', series: 3, targetReps: '30s', targetLoadKg: 0, restSeconds: 30, previousLoadKg: 0, muscle: 'Core' },
    ],
  },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  { id: 'streak-7', name: '7 dias seguidos', description: 'Primeira semana completa', tier: 'bronze', iconName: 'flame', unlocked: false, unlockedAt: null, progress: 0, target: 7 },
  { id: 'streak-30', name: '30 dias seguidos', description: 'Um mês de constância', tier: 'silver', iconName: 'flame', unlocked: false, unlockedAt: null, progress: 0, target: 30 },
  { id: 'streak-50', name: '50 dias seguidos', description: 'Quase dois meses', tier: 'silver', iconName: 'flame', unlocked: false, unlockedAt: null, progress: 0, target: 50 },
  { id: 'streak-100', name: '100 dias seguidos', description: 'Constância extrema', tier: 'gold', iconName: 'flame', unlocked: false, unlockedAt: null, progress: 0, target: 100 },
  { id: 'first-workout', name: 'Primeiro treino', description: 'Concluiu a primeira sessão', tier: 'bronze', iconName: 'medal', unlocked: false, unlockedAt: null, progress: 0, target: 1 },
  { id: 'workouts-50', name: '50 treinos', description: 'Cinquenta sessões completas', tier: 'silver', iconName: 'medal', unlocked: false, unlockedAt: null, progress: 0, target: 50 },
  { id: 'workouts-100', name: '100 treinos', description: 'Cem sessões completas', tier: 'silver', iconName: 'medal', unlocked: false, unlockedAt: null, progress: 0, target: 100 },
  { id: 'pr-first', name: 'Primeiro PR', description: 'Bateu o primeiro recorde pessoal', tier: 'bronze', iconName: 'bolt', unlocked: false, unlockedAt: null, progress: 0, target: 1 },
  { id: 'pr-10', name: '10 PRs', description: 'Dez recordes pessoais', tier: 'silver', iconName: 'bolt', unlocked: false, unlockedAt: null, progress: 0, target: 10 },
  { id: 'pr-25', name: '25 PRs', description: 'Vinte e cinco recordes pessoais', tier: 'gold', iconName: 'bolt', unlocked: false, unlockedAt: null, progress: 0, target: 25 },
  { id: 'week-goal', name: 'Meta da semana', description: '5 treinos em 7 dias', tier: 'bronze', iconName: 'target', unlocked: false, unlockedAt: null, progress: 0, target: 5 },
  { id: 'year', name: 'Ano completo', description: 'Trezentos e sessenta e cinco dias', tier: 'gold', iconName: 'calendar', unlocked: false, unlockedAt: null, progress: 0, target: 365 },
];

export const SEED_MEASUREMENTS: Measurement[] = [];
