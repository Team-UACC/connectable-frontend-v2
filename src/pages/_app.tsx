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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
import FullScreenModal from '~/components/FullScreenModal';
import Layout from '~/components/Layout';
import useGtag from '~/hooks/useGtag';
import usePathStore from '~/hooks/usePathStore';
import useScrollRestorer from '~/hooks/useScrollRestorer';
import useUserStatus from '~/hooks/useUserStatus';
import { useModalStore } from '~/stores/modal';
import { isShallowModalUrl } from '~/utils';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const { hideModal } = useModalStore();

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

  const [loading, setLoading] = useState(true);

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <Layout headerType="home" selectedFooter={null}>
        {page}
      </Layout>
    ));

  useUserStatus();
  usePathStore();
  useScrollRestorer();
  useGtag();

  useEffect(() => {
    const handleComplete = (url: string, { shallow }: { shallow: boolean }) => {
      if (!isShallowModalUrl(url) && !shallow) {
        hideModal();
      }
    };

    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router, hideModal]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2 * 1000);
  }, []);

  return loading ? (
    <div className="relative flex items-center justify-center w-full h-screen m-auto bg-black max-w-layout ">
      <div className="flex items-center justify-center w-full animate-bounce">
        <Image
          src={'/images/logo/Connectable_sg1_w.png'}
          alt="logo"
          layout="fixed"
          width={280}
          height={140}
          className=""
        />
      </div>
    </div>
  ) : (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <FullScreenModal />
          <Toaster containerStyle={{ top: 300 }} toastOptions={{ duration: 3000 }} />
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
