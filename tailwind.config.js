/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#09090B',
          1: '#111114',
          2: '#1A1A1F',
        },
        fg: {
          0: '#FAFAFA',
          1: '#A1A1AA',
          2: '#52525B',
        },
        brand: {
          DEFAULT: '#D4FF3A',
          glow: 'rgba(212, 255, 58, 0.28)',
        },
        line: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        danger: {
          DEFAULT: 'rgb(239, 68, 68)',
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'rgba(239, 68, 68, 0.3)',
        },
        tier: {
          bronze: '#c07a4a',
          silver: '#c8cdd7',
          gold: '#d4ff3a',
        },
      },
      fontFamily: {
        display: ['Genos_700Bold'],
        'display-italic': ['Genos_700Bold_Italic'],
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
      },
      letterSpacing: {
        display: '-0.04em',
        mono: '0.2em',
      },
      borderRadius: {
        card: '16px',
        'card-sm': '12px',
      },
    },
  },
  plugins: [],
};
