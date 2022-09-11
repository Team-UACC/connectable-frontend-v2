import { ReactElement } from 'react';

import Layout from '~/components/Layout';

const MyPage = () => {
  return <div>my page</div>;
};

MyPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="my">
    {page}
  </Layout>
);
export default MyPage;
