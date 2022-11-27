import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import CompanyFooter from '~/components/Constants/CompanyFooter';
import AllTicketsList from '~/components/Home/AllTicketsList';
import HomeHeadMeta from '~/components/Home/HomeHeadMeta';
import Intro from '~/components/Home/Intro';
import TodayTicketSwiper from '~/components/Home/TodayTicketSwiper';
import Layout from '~/components/Layout';
import { prefetchAllEvents } from '~/hooks/apis/useAllEvents';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await prefetchAllEvents({ queryClient });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  return (
    <>
      <HomeHeadMeta />

      <div>
        <Intro />
        <TodayTicketSwiper />
        <AllTicketsList />
        <CompanyFooter />
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
