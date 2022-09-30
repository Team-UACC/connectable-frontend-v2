import { ReactElement } from 'react';

import Layout from '~/components/Layout';

const ArtistPage = () => {
  return <LoginSection />;
};

const LoginSection = () => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-126px)] bg-white">
      <section className="absolute flex flex-col gap-8 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
        <h1 className=" m-auto text-[2rem] font-bold text-gray1">ARTIST PAGE</h1>
        <div className="whitespace-pre-line text-gray2">
          아티스트 페이지는 준비중입니다. <br />
          <br />
          2022-10-10 오픈 예정
        </div>
      </section>
    </div>
  );
};

ArtistPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="artists">
    {page}
  </Layout>
);
export default ArtistPage;
