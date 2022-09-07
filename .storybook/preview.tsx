import '../src/styles/globals.css';
import '../public/fonts/SUIT-woff2/SUIT.css';
import '../public/fonts/GmarketSansTTF/GmarketSansTTF.css';
import '../public/fonts/Montserrat/Montserrat.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
