import { ReactElement } from 'react';

import Layout from '~/components/Layout';

const ArtistPage = () => {
  return <div>artist page</div>;
};

ArtistPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="artists">
    {page}
  </Layout>
);
export default ArtistPage;
