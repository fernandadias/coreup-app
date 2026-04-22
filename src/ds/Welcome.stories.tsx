import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';

function Welcome() {
  return (
    <View
      style={{
        padding: 24,
        backgroundColor: '#09090B',
        width: 390,
        minHeight: 400,
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#D4FF3A', fontSize: 14, letterSpacing: 2, marginBottom: 12 }}>
        COREUPDS
      </Text>
      <Text style={{ color: '#FAFAFA', fontSize: 32, fontWeight: '600', marginBottom: 16 }}>
        Welcome
      </Text>
      <Text style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 22 }}>
        Design system do CoreUp. Tokens e componentes serão documentados aqui,
        começando pela Home.
      </Text>
    </View>
  );
}

const meta = {
  title: 'Intro/Welcome',
  component: Welcome,
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
