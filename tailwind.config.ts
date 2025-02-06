import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
      },

      colors: {
        'blue-ra-900': '#1E2A32',
        'blue-ra-800': '#31404b',
        'blue-ra-500': '#7fb2ff',
        'blue-ra-200': '#ebf1ff',
        'blue-ra-100': '#EEF0F4',
        'green-ra-700': '#00c87a',
        'green-ra-300': '#b2e3cb',
        'red-ra-500': '#e36359',
        'red-ra-50': '#eedad9',
      },
    },
  },
  plugins: [],
} satisfies Config;
