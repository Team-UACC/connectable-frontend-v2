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
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import FullScreenModal from '~/components/FullScreenModal';
import Layout from '~/components/Layout';
import useGtag from '~/hooks/useGtag';
import usePathStore from '~/hooks/usePathStore';
import useScrollRestorer from '~/hooks/useScrollRestorer';
import useUser from '~/hooks/useUser';
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

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <Layout headerType="home" selectedFooter={null}>
        {page}
      </Layout>
    ));

  useUser();
  usePathStore();
  useScrollRestorer();
  useGtag();

  useEffect(() => {
    const handleComplete = (url: string, { shallow }: { shallow: boolean }) => {
      toast.dismiss();

      if (!isShallowModalUrl(url) && !shallow) {
        hideModal();
      }
    };

    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router, hideModal]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <FullScreenModal />
          <Toaster containerStyle={{ top: 300 }} toastOptions={{ duration: 3000 }} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
