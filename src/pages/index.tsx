import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import Label from '~/components/Design/Label';
import MySwiper from '~/components/Design/Swiper';
import Layout from '~/components/Layout';

const Home = () => {
  return (
    <>
      <Intro />
      <TodayTicketSwiper />
    </>
  );
};

const Intro = () => {
  return (
    <section className="relative bg-black ">
      <div className="pt-[60px] pb-[42px] w-full flex flex-col items-center">
        <span className="text-xl font-bold text-center text-brand-pink">아티스트와 더 가깝게</span>
        <h1 className="font-gmarket text-[42px] leading-[50px] text-white font-bold mt-2">NFT 티켓의</h1>
        <h1 className="font-gmarket text-[42px] leading-[50px] text-white font-bold">새로운 패러다임</h1>
        <Link href={'/docs/guide'}>
          <a className="mt-4 text-sm text-white underline">자세히 보기</a>
        </Link>
      </div>
      <Image
        src="/images/img_banner.png"
        alt="banner"
        width={428}
        height={204}
        layout="responsive"
        placeholder="empty"
        className="animate-fadeIn"
      />
    </section>
  );
};

const TodayTicketSwiper = () => {
  return (
    <section className="flex flex-col items-center w-full mt-[60px]">
      <Label title="TODAY TICKET" color="white" />
      <MySwiper className="mt-8" />
    </section>
  );
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
