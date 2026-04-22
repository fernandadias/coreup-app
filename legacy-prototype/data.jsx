// Mock data for CoreUp — intermediate athlete, 6 months, fat-loss focus

const USER = {
  name: 'Joaquina da Silva',
  firstName: 'Joaquina',
  coach: 'Nanda Dias',
  plan: 'Redução de % de gordura · Split ABC',
  goal: 'Redução de % de gordura',
  startDate: 'Out 2025',
  streak: 47,
  weekGoal: 5,
  weekDone: 3,
  avatar: 'assets/joaquina.jpg',
  coachAvatar: 'assets/nanda.jpg',
};

// each workout has an "objetivo" (focus/target) instead of PRs
const TODAY_WORKOUT = {
  id: 'B',
  letter: 'B',
  name: 'Treino B · Costas + Bíceps',
  duration: 58,
  objetivos: [
    'Foco na contração excêntrica',
    'Manter FC acima de 130 bpm',
  ],
  exercises: [
    { id: 1, name: 'Puxada frente', series: 4, reps: '10-12', load: '45kg', rest: 90, prev: '42.5kg', muscle: 'Dorsal' },
    { id: 2, name: 'Remada curvada', series: 4, reps: '8-10', load: '50kg', rest: 120, prev: '50kg', muscle: 'Dorsal' },
    { id: 3, name: 'Remada unilateral', series: 3, reps: '10-12', load: '22kg', rest: 90, prev: '20kg', muscle: 'Dorsal', pr: true },
    { id: 4, name: 'Pullover máquina', series: 3, reps: '12-15', load: '35kg', rest: 60, prev: '35kg', muscle: 'Dorsal' },
    { id: 5, name: 'Rosca direta barra W', series: 4, reps: '10-12', load: '20kg', rest: 60, prev: '17.5kg', muscle: 'Bíceps', pr: true },
    { id: 6, name: 'Rosca martelo', series: 3, reps: '12', load: '14kg', rest: 60, prev: '14kg', muscle: 'Bíceps' },
    { id: 7, name: 'Rosca scott', series: 3, reps: '10-12', load: '15kg', rest: 60, prev: '15kg', muscle: 'Bíceps' },
  ],
};

const WORKOUTS = [
  { id: 'A', letter: 'A', name: 'Peito + Tríceps', exercises: 7, duration: 55, lastDone: 'ontem' },
  { id: 'B', letter: 'B', name: 'Costas + Bíceps', exercises: 7, duration: 58, lastDone: 'hoje', isToday: true },
  { id: 'C', letter: 'C', name: 'Pernas + Ombros', exercises: 8, duration: 65, lastDone: 'há 3 dias' },
  { id: 'D', letter: 'D', name: 'Cardio + Core', exercises: 5, duration: 35, lastDone: 'há 5 dias' },
];

const WEIGHT_DATA = [
  { week: 'Nov', value: 68.4 }, { week: 'Dez', value: 68.1 },
  { week: 'Jan', value: 67.6 }, { week: 'Fev', value: 67.2 },
  { week: 'Mar', value: 66.8 }, { week: 'Abr', value: 66.3 },
];
const BODYFAT_DATA = [
  { week: 'Nov', value: 24.1 }, { week: 'Dez', value: 23.4 },
  { week: 'Jan', value: 22.6 }, { week: 'Fev', value: 21.8 },
  { week: 'Mar', value: 20.9 }, { week: 'Abr', value: 20.2 },
];
const FREQUENCY_DATA = [
  { week: 'S1', value: 4 }, { week: 'S2', value: 5 },
  { week: 'S3', value: 5 }, { week: 'S4', value: 3 },
  { week: 'S5', value: 5 }, { week: 'S6', value: 4 },
  { week: 'S7', value: 5 }, { week: 'S8', value: 5 },
];
const MEASUREMENTS = [
  { label: 'Braço', value: 31.2, unit: 'cm', delta: +0.8 },
  { label: 'Coxa', value: 58.4, unit: 'cm', delta: +1.2 },
  { label: 'Cintura', value: 71.5, unit: 'cm', delta: -2.1 },
  { label: 'Quadril', value: 94.0, unit: 'cm', delta: +0.4 },
];

const ACHIEVEMENTS = [
  { id: 1, name: '7 dias seguidos', desc: 'Primeira semana completa', tier: 'bronze', unlocked: true, date: 'Nov 14', icon: 'flame' },
  { id: 2, name: '30 dias seguidos', desc: 'Um mês de constância', tier: 'silver', unlocked: true, date: 'Dez 08', icon: 'flame' },
  { id: 3, name: 'Primeiro objetivo', desc: 'Bateu o primeiro objetivo de treino', tier: 'bronze', unlocked: true, date: 'Nov 22', icon: 'bolt' },
  { id: 4, name: '10 objetivos', desc: 'Dez objetivos atingidos', tier: 'silver', unlocked: true, date: 'Fev 03', icon: 'bolt' },
  { id: 5, name: 'Meta da semana', desc: '5 treinos em 7 dias', tier: 'bronze', unlocked: true, date: 'esta semana', icon: 'target' },
  { id: 6, name: '100 treinos', desc: 'Cem sessões completas', tier: 'silver', unlocked: true, date: 'Mar 19', icon: 'medal' },
  { id: 7, name: '50 dias seguidos', desc: 'Quase dois meses', tier: 'silver', unlocked: false, progress: 47, total: 50, icon: 'flame' },
  { id: 8, name: '25 objetivos', desc: 'Vinte e cinco objetivos', tier: 'gold', unlocked: false, progress: 18, total: 25, icon: 'bolt' },
  { id: 9, name: '6 meses', desc: 'Meio ano de jornada', tier: 'gold', unlocked: false, progress: 184, total: 180, icon: 'calendar', almost: true },
  { id: 10, name: '100 dias seguidos', desc: 'Constância extrema', tier: 'gold', unlocked: false, progress: 47, total: 100, icon: 'flame' },
  { id: 11, name: 'Ano completo', desc: 'Trezentos e sessenta e cinco dias', tier: 'gold', unlocked: false, progress: 184, total: 365, icon: 'calendar' },
  { id: 12, name: 'Mestre dos objetivos', desc: '50 objetivos batidos', tier: 'gold', unlocked: false, progress: 18, total: 50, icon: 'bolt' },
];

const WEEK = [
  { day: 'Seg', done: true, letter: 'A' },
  { day: 'Ter', done: false, letter: null, rest: true },
  { day: 'Qua', done: true, letter: 'C' },
  { day: 'Qui', done: false, letter: null, rest: true },
  { day: 'Sex', done: true, letter: 'A' },
  { day: 'Sáb', done: false, letter: 'B', today: true },
  { day: 'Dom', done: false, letter: null, rest: true },
];

Object.assign(window, {
  USER, TODAY_WORKOUT, WORKOUTS,
  WEIGHT_DATA, BODYFAT_DATA, FREQUENCY_DATA, MEASUREMENTS,
  ACHIEVEMENTS, WEEK,
});
