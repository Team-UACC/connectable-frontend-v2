import '../../public/fonts/SUIT-woff2/SUIT.css';
import '../../public/fonts/GmarketSansTTF/GmarketSansTTF.css';
import '../../public/fonts/Montserrat/Montserrat.css';

import '~/styles/globals.css';
import '~/styles/swiper.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import Layout from '~/components/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <Layout headerType="home" selectedFooter={null}>
        {page}
      </Layout>
    ));

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp;
