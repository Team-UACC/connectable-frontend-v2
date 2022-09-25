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
import { ReactElement, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import FullScreenModal from '~/components/FullScreenModal';
import Layout from '~/components/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <Layout headerType="home" selectedFooter={null}>
        {page}
      </Layout>
    ));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <FullScreenModal />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
