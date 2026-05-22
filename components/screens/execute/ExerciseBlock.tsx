import { Text, View } from 'react-native';

import type { Exercise, SetLog } from '../../../src/types';
import { SetRow } from './SetRow';

interface ExerciseBlockProps {
  exercise: Exercise;
  sets: SetLog[];
  disabled?: boolean;
  onCompleteSet: (loadKg: number, reps: number, setNumber: number) => void;
}

export function ExerciseBlock({
  exercise,
  sets,
  disabled,
  onCompleteSet,
}: ExerciseBlockProps) {
  const nextSetNumber = sets.length + 1;
  const allDone = sets.length >= exercise.series;

  return (
    <View className="rounded-card border border-line bg-bg-1 p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
            {exercise.muscle}
          </Text>
          <Text className="mt-1 font-sans-semibold text-base text-fg-0">
            {exercise.name}
          </Text>
          <Text className="mt-1 font-sans text-xs text-fg-1">
            {exercise.series} séries · {exercise.targetReps} reps · descanso {exercise.restSeconds}s
          </Text>
          {exercise.previousLoadKg > 0 && (
            <Text className="mt-1 font-sans text-xs text-fg-2">
              Última: {exercise.previousLoadKg}kg
            </Text>
          )}
        </View>
        {allDone && (
          <View className="rounded-full bg-brand/15 px-2 py-1">
            <Text className="font-sans-semibold text-[9px] uppercase tracking-[0.15em] text-brand">
              ✓ {exercise.series}/{exercise.series}
            </Text>
          </View>
        )}
      </View>

      <View className="mt-4 gap-2">
        {Array.from({ length: exercise.series }).map((_, i) => {
          const setNumber = i + 1;
          const existing = sets[i];
          const isActiveRow = !existing && setNumber === nextSetNumber;
          return (
            <SetRow
              key={setNumber}
              setNumber={setNumber}
              defaultLoadKg={exercise.targetLoadKg}
              defaultReps={exercise.targetReps}
              existing={existing}
              disabled={!isActiveRow && !existing ? true : disabled}
              onComplete={(loadKg, reps) => onCompleteSet(loadKg, reps, setNumber)}
            />
          );
        })}
      </View>
    </View>
  );
}
