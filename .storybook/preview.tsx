import '../src/styles/globals.css';
import '../src/styles/swiper.css';
import '../public/fonts/SUIT-woff2/SUIT.css';
import '../public/fonts/GmarketSansTTF/GmarketSansTTF.css';
import '../public/fonts/Montserrat/Montserrat.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import * as nextImage from 'next/image';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'gray',
    values: [
      {
        name: 'gray',
        value: '#F3F5FB',
      },
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'black',
        value: '#000000',
      },
      {
        name: 'blue',
        value: '#2E48A0',
      },
    ],
  },
};
