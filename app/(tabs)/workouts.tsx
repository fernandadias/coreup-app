import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function WorkoutsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <View className="flex-1 px-6 pt-6">
        <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
          Treinos
        </Text>
        <Text className="mt-2 font-display text-4xl tracking-display text-fg-0">
          Split ABC
        </Text>
        <Text className="mt-4 font-sans text-sm leading-5 text-fg-1">
          Placeholder. Lista dos treinos (A/B/C/D) e estatísticas entram aqui na Fase 3.
        </Text>
      </View>
    </SafeAreaView>
  );
}
