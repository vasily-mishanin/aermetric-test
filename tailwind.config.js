/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xsm: '414px',
      },
      animation: {
        'ping-up': 'popup 0.2s linear 1',
        'ping-down': 'popdown 0.4s linear 1',
      },
      keyframes: {
        popup: {
          '0%': {
            transform: 'scale(0.9)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        popdown: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
};
