import { ReactElement, useEffect } from 'react';

import Layout from '~/components/Layout';
import { useModalStore } from '~/stores/modal';

const MyPage = () => {
  const { showModal } = useModalStore();

  useEffect(() => {
    showModal('로그인', <>login</>);
  }, []);
  return <div>my page</div>;
};

MyPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="my">
    {page}
  </Layout>
);
export default MyPage;
