import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import type { SetLog } from '../../../src/types';

interface SetRowProps {
  setNumber: number;
  defaultLoadKg: number;
  defaultReps: string;
  existing?: SetLog;
  disabled?: boolean;
  onComplete: (loadKg: number, reps: number) => void;
}

export function SetRow({
  setNumber,
  defaultLoadKg,
  defaultReps,
  existing,
  disabled,
  onComplete,
}: SetRowProps) {
  const [load, setLoad] = useState(
    existing ? String(existing.loadKg) : String(defaultLoadKg),
  );
  const [reps, setReps] = useState(
    existing ? String(existing.reps) : defaultReps.replace(/[^\d]/g, '').slice(0, 2),
  );

  const isDone = !!existing;

  const handleConfirm = () => {
    const loadNum = parseFloat(load.replace(',', '.'));
    const repsNum = parseInt(reps, 10);
    if (isNaN(loadNum) || isNaN(repsNum) || repsNum <= 0) return;
    onComplete(loadNum, repsNum);
  };

  return (
    <View
      className={[
        'flex-row items-center gap-2 rounded-card-sm border p-3',
        isDone ? 'border-brand/30 bg-brand/5' : 'border-line bg-bg-2',
      ].join(' ')}>
      <View
        className={[
          'h-7 w-7 items-center justify-center rounded-full',
          isDone ? 'bg-brand' : 'bg-bg-1',
        ].join(' ')}>
        <Text
          className={[
            'font-sans-semibold text-xs',
            isDone ? 'text-bg-0' : 'text-fg-1',
          ].join(' ')}>
          {setNumber}
        </Text>
      </View>

      <View className="flex-1 flex-row items-center gap-2">
        <TextInput
          editable={!isDone && !disabled}
          keyboardType="decimal-pad"
          value={load}
          onChangeText={setLoad}
          className="h-9 w-16 rounded-md border border-line bg-bg-1 px-2 text-center font-sans-medium text-sm text-fg-0"
          placeholderTextColor="#52525B"
        />
        <Text className="font-sans text-xs text-fg-2">kg</Text>
        <Text className="ml-2 font-sans text-xs text-fg-2">×</Text>
        <TextInput
          editable={!isDone && !disabled}
          keyboardType="number-pad"
          value={reps}
          onChangeText={setReps}
          className="h-9 w-12 rounded-md border border-line bg-bg-1 px-2 text-center font-sans-medium text-sm text-fg-0"
          placeholderTextColor="#52525B"
        />
        <Text className="font-sans text-xs text-fg-2">reps</Text>
      </View>

      {existing?.isPR && (
        <View className="rounded-full bg-brand/15 px-2 py-0.5">
          <Text className="font-sans-semibold text-[9px] uppercase tracking-[0.15em] text-brand">
            PR
          </Text>
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isDone ? 'Concluído' : 'Concluir set'}
        disabled={isDone || disabled}
        onPress={handleConfirm}
        className={[
          'h-9 w-9 items-center justify-center rounded-full',
          isDone ? 'bg-brand' : disabled ? 'bg-bg-1' : 'bg-fg-0',
        ].join(' ')}>
        <Ionicons
          name={isDone ? 'checkmark' : 'arrow-forward'}
          size={16}
          color={isDone || !disabled ? '#09090B' : '#52525B'}
        />
      </Pressable>
    </View>
  );
}
