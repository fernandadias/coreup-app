import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { PRDetection } from '../../../src/types';

interface PRToastProps {
  prs: PRDetection[];
}

export function PRToast({ prs }: PRToastProps) {
  if (prs.length === 0) return null;

  return (
    <View className="mx-6 mt-4 overflow-hidden rounded-card border border-brand bg-brand/10 p-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="flash" size={16} color="#D4FF3A" />
        <Text className="font-sans-semibold text-xs uppercase tracking-[0.2em] text-brand">
          {prs.length === 1 ? 'Novo recorde pessoal' : `${prs.length} recordes pessoais`}
        </Text>
      </View>
      <View className="mt-2 gap-1">
        {prs.map((pr) => (
          <Text key={pr.exerciseId} className="font-sans text-sm text-fg-0">
            {pr.exerciseName}:{' '}
            <Text className="font-sans-semibold text-brand">
              {pr.newLoadKg}kg
            </Text>
            <Text className="text-fg-2"> (era {pr.previousLoadKg}kg)</Text>
          </Text>
        ))}
      </View>
    </View>
  );
}
