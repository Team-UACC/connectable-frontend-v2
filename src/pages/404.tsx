import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Layout from '~/components/Layout';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[4rem] font-bold text-gray1">404 Error</h1>
      <div className="whitespace-pre-line text-gray2">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </div>
      <button
        className="mt-6 text-brand-skyblue"
        onClick={() => {
          router.back();
        }}
      >
        이전 페이지로 돌아가기
      </button>
    </section>
  );
}

NotFoundPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events" bgColor="white">
    {page}
  </Layout>
);
