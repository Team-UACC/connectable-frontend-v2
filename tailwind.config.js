/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT'],
        gmarket: ['GmarketTTF'],
        montserrat: ['Montserrat'],
      },
    },
  },
  plugins: [],
};
