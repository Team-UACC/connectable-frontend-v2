import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { ReactElement, useEffect, useRef } from 'react';

import Button from '~/components/Design/Button';
import CopyButton from '~/components/Design/CopyButton';
import Tab from '~/components/Design/Tab';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import UserOrderStatusList from '~/components/Order/UserOrderStatusList';
import UserTicketCardList from '~/components/Tickets/TicketCard/UserTicketCardList';
import useFullScreenModal from '~/hooks/useFullScreenModal';
import useShallowModal from '~/hooks/useShallowModal';
import { useUserStore } from '~/stores/user';

const TITLES = ['마이 티켓', '거래 내역'];

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { auth } = ctx.req.cookies;

  // auth cookie가 있으면 로그인 상태로 간주하고 skeleton을 내려줌 (낙관적으로 skeleton 보여주기)

  return {
    props: {
      hasSkeleton: Boolean(auth),
    },
  };
}

interface Props {
  hasSkeleton: boolean;
}

function MyPage({ hasSkeleton }: Props) {
  const { isLoggedIn, userName, klaytnAddress, phoneNumber } = useUserStore();
  const { showProfileEditModal } = useFullScreenModal();

  const { pushShallowUrl } = useShallowModal();

  const hasSkeletonRef = useRef(hasSkeleton);

  useEffect(() => {
    hasSkeletonRef.current = false;
  }, []);

  if (isLoggedIn === false)
    return (
      <>
        <HeadMeta title="Connectable | 로그인" />

        {hasSkeletonRef.current ? <PageSkeleton /> : <LoginSection />}
      </>
    );

  return (
    <>
      <HeadMeta title="Connectable | 마이페이지" />

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
              onClick={() => {
                pushShallowUrl();
                showProfileEditModal({ userName, phoneNumber });
              }}
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
        <div className="w-full min-h-[calc(100vh-126px-20rem)] bg-white">
          <Tab titles={TITLES}>
            <UserTicketCardList />
            <UserOrderStatusList />
          </Tab>
        </div>
      </div>
    </>
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
  const { showLoginModal } = useFullScreenModal();

  return (
    <div className="w-full h-full min-h-[calc(100vh-126px)] bg-white">
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
            showLoginModal();
          }}
        >
          로그인
        </Button>
      </section>
    </div>
  );
};

const PageSkeleton = () => (
  <div className="w-full">
    <div className="bg-black h-[20rem] " />
    <div className="bg-white h-[calc(100vh-20rem)]" />
  </div>
);

MyPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="my">
    {page}
  </Layout>
);
export default MyPage;
