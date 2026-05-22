import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <View className="flex-1 px-6 pt-6">
        <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
          Home
        </Text>
        <Text className="mt-2 font-display italic text-5xl tracking-display text-fg-0">
          CoreUp
        </Text>
        <Text className="mt-4 font-sans text-sm leading-5 text-fg-1">
          Placeholder. Streak, treino de hoje e progresso semanal entram aqui na Fase 3.
        </Text>
        <View className="mt-8 rounded-card border border-line bg-bg-1 p-6">
          <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-brand">
            Streak
          </Text>
          <Text className="mt-1 font-display text-6xl tracking-display text-fg-0">0</Text>
          <Text className="mt-1 font-sans text-sm text-fg-1">dias seguidos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
