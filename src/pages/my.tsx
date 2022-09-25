import { ReactElement, useEffect } from 'react';

import Button from '~/components/Design/Button';
import KlipAuth from '~/components/Form/KlipAuthForm';
import Layout from '~/components/Layout';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

const MyPage = () => {
  const { isLoggedIn } = useUserStore();

  if (isLoggedIn === false) return <LoginSection />;

  return <div>my page</div>;
};

const LoginSection = () => {
  const { showModal } = useModalStore();

  return (
    <section className="absolute flex flex-col gap-8 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[2rem] font-bold text-gray1">MY PAGE</h1>
      <div className="whitespace-pre-line text-gray2">
        서비스를 이용하려면
        <br />
        아래 버튼을 통해 Klip으로 로그인해주세요.
      </div>
      <Button
        color="black"
        onClick={() => {
          showModal('로그인', <KlipAuth />);
        }}
      >
        로그인
      </Button>
    </section>
  );
};

MyPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="my">
    {page}
  </Layout>
);
export default MyPage;
