import { ReactElement } from 'react';

import Layout from '~/components/Layout';

const Home = () => {
  return <div className="font-bold font-montserrat h-[1000px]">Montserrat</div>;
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
