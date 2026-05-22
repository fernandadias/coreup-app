import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function AchievementsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-0" edges={['top']}>
      <View className="flex-1 px-6 pt-6">
        <Text className="font-sans-medium text-[10px] uppercase tracking-[0.2em] text-fg-2">
          Medalhas
        </Text>
        <Text className="mt-2 font-display text-4xl tracking-display text-fg-0">
          Conquistas
        </Text>
        <Text className="mt-4 font-sans text-sm leading-5 text-fg-1">
          Placeholder. Bronze, prata e ouro entram aqui na Fase 4.
        </Text>
      </View>
    </SafeAreaView>
  );
}
