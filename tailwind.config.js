/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT'],
        gmarket: ['GmarketSans'],
        montserrat: ['Montserrat'],
      },
      colors: {
        transparent: 'transparent',
        curretn: 'current',
        'brand-pink': '#FE52B0',
        'brand-pink-second': '#FFBAE0',
        'brand-pink-third': '#FFF4FA',
        'brand-skyblue': '#08BCFF',
        'brand-skyblue-second': '#EDF8FD',
        gray1: '#242424',
        gray2: '#555',
        gray3: '#8B8B8B',
        gray4: '#A5A5A5',
        gray5: '#C1C1C1',
        gray6: '#DFDFDF',
        background1: '#F7F7F7',
        background2: '#F3F3F5',
        error: '#DF1D1D',
        success: '#4CAF50',
        'point-neonblue': '#00D8F0',
        'point-neongreen': '#6DFFCB',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
