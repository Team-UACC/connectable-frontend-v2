import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';

import Label from '~/components/Design/Label';
import MySwiper from '~/components/Design/Swiper';
import EventCard from '~/components/Events/EventCard';
import Layout from '~/components/Layout';
import { BUSINESS } from '~/constants/company';
import { DOCS_PATH } from '~/constants/path';

const Home = () => {
  return (
    <>
      <Intro />
      <TodayTicketSwiper />
      <EventList events={EVENTS} />
      <Footer />
    </>
  );
};

const EVENTS: Array<{
  id: number;
  title: string;
  description?: string;
  image: string;
  saleStatus: '판매중' | '매진' | '판매종료';
}> = [
  {
    id: 1,
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: `판매중`,
  },
  {
    id: 2,
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: `매진`,
  },
  {
    id: 3,
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
        <Link href={DOCS_PATH.GUIDE}>
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
        {EVENTS.map(({ id, title, description, image, saleStatus }) => (
          <Link href={`/events/${id}`} key={id}>
            <a>
              <EventCard title={title} description={description} image={image} saleStatus={saleStatus} overlap={true} />
            </a>
          </Link>
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
      <ul className="flex flex-wrap w-full justify-evenly ">
        {events.map(({ id, title, description, image, saleStatus }) => (
          <Link href={`/events/${id}`} key={id}>
            <a className=" basis-[45%] mt-8 ">
              <EventCard
                title={title}
                description={description}
                image={image}
                saleStatus={saleStatus}
                overlap={false}
              />
            </a>
          </Link>
        ))}
        {length % 2 === 1 && <div className=" basis-[45%] mt-8 " />}
      </ul>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-4 py-8 bg-gray1">
      <ul className="flex w-full gap-4 text-xs font-bold text-gray4">
        <li>
          <Link href={DOCS_PATH.TERMS_OF_SERVICE} passHref>
            <a>이용약관</a>
          </Link>
        </li>
        <li>
          <Link href={DOCS_PATH.PRIVACY_POLICY} passHref>
            <a>개인정보처리방침</a>
          </Link>
        </li>
      </ul>

      <ul className="flex flex-col w-full gap-2 mt-4 text-xs text-gray3">
        <li>
          ©2022. {BUSINESS.NAME_ENG} {BUSINESS.NAME}
        </li>
        <li>사업자등록번호: {BUSINESS.REFISTRATION_NUMBER}</li>
        <li>
          대표: {BUSINESS.REPRESENTATIVE} | 주소: {BUSINESS.ADDRESS}
        </li>
        <li>이메일 문의: {BUSINESS.EMAIL}</li>
        <li>전화 문의: {BUSINESS.PHONE}</li>
      </ul>
    </footer>
  );
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
