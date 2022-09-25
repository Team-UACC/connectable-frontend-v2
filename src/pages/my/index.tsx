import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Button from '~/components/Design/Button';
import CopyButton from '~/components/Design/CopyButton';
import Tab from '~/components/Design/Tab';
import KlipAuth from '~/components/Form/KlipAuthForm';
import ProfileEditForm from '~/components/Form/ProfileEditForm';
import Layout from '~/components/Layout';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

const TITLES = ['마이 티켓', '거래 내역'];

function MyPage() {
  const router = useRouter();

  const { isLoggedIn } = useUserStore();

  const { userName, klaytnAddress, phoneNumber } = useUserStore();
  const { showModal } = useModalStore();

  if (isLoggedIn === false) return <LoginSection />;

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className=" text-white flex flex-col items-center w-full h-[20rem] border-brand bg-black">
        <div className="relative mt-[2.25rem]">
          <Image
            src="/icons/default_profile.svg"
            alt="profile"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
          <button
            className="absolute bottom-[6px] right-0"
            onClick={() => showModal('프로필 수정', <ProfileEditForm userName={userName} phoneNumber={phoneNumber} />)}
          >
            <Image src="/icons/icon_edit.svg" alt="edit" width={24} height={24} />
          </button>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-center ">{userName}</h1>
        <div className="relative w-[14rem] mt-6 text-sm flex flex-col gap-2 text-gray6 ">
          <TextInfo title="Klip주소" info={klaytnAddress} hasCopy={true} />
          <TextInfo title="전화번호" info={phoneNumber} />
        </div>
      </div>
      <div className="w-full mt-6">
        <Tab titles={TITLES}>
          {/* <UserTicketCardList /> */}
          {/* <UserOrderStatusList /> */}
          <div>UserTicketCardList</div>
          <div>UserOrderStatusList</div>
        </Tab>
      </div>
    </div>
  );
}

const TextInfo = ({ title, info, hasCopy = false }: { title: string; info: string; hasCopy?: boolean }) => {
  return (
    <div className="relative flex w-full">
      <div className="font-bold w-[50px]">{title}</div>
      <div className="flex w-full ml-3">
        {hasCopy ? (
          <>
            <div className="relative w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">{info}</div>
            <CopyButton copyTarget={info} />
          </>
        ) : (
          <>{info}</>
        )}
      </div>
    </div>
  );
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
