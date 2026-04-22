import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#09090B' },
        { name: 'surface', value: '#111114' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    viewport: {
      defaultViewport: 'iphone14',
      viewports: {
        iphone14: {
          name: 'iPhone 14',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        iphone14Pro: {
          name: 'iPhone 14 Pro Max',
          styles: { width: '430px', height: '932px' },
          type: 'mobile',
        },
        pixel7: {
          name: 'Pixel 7',
          styles: { width: '412px', height: '915px' },
          type: 'mobile',
        },
      },
    },
    layout: 'centered',
  },
};

export default preview;
