import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';

import Label from '~/components/Design/Label';
import MySwiper from '~/components/Design/Swiper';
import EventCard from '~/components/Events/EventCard';
import Layout from '~/components/Layout';

const Home = () => {
  return (
    <>
      <Intro />
      <TodayTicketSwiper />
      <EventList events={EVENTS} />
    </>
  );
};

const EVENTS: Array<{
  title: string;
  description?: string;
  image: string;
  saleStatus: '판매중' | '매진' | '판매종료';
}> = [
  {
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: `판매중`,
  },
  {
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: `매진`,
  },
  {
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: `판매종료`,
  },
];

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
    <section className="flex flex-col items-center w-full py-[60px]">
      <Label title="TODAY TICKETS" color="white" />
      <MySwiper className="mt-8">
        {EVENTS.map(({ title, description, image, saleStatus }) => (
          <EventCard
            title={title}
            description={description}
            image={image}
            saleStatus={saleStatus}
            overlap={true}
            key={title}
          />
        ))}
      </MySwiper>
    </section>
  );
};

const EventList = ({ events }: { events: Array<any> }) => {
  const length = useMemo(() => events.length, [events]);

  return (
    <section className="flex flex-col items-center w-full py-[60px] bg-black">
      <Label title="ALL TICKETS" color="blue" />
      <div className="flex flex-wrap w-full justify-evenly ">
        {events.map(({ title, description, image, saleStatus }) => (
          <>
            <div className=" basis-[45%] mt-8 " key={title}>
              <EventCard
                title={title}
                description={description}
                image={image}
                saleStatus={saleStatus}
                overlap={false}
              />
            </div>
          </>
        ))}
        {length % 2 === 1 && <div className=" basis-[45%] mt-8 " />}
      </div>
    </section>
  );
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
