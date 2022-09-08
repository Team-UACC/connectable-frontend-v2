import '../../public/fonts/SUIT-woff2/SUIT.css';
import '../../public/fonts/GmarketSansTTF/GmarketSansTTF.css';
import '../../public/fonts/Montserrat/Montserrat.css';

import '~/styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
