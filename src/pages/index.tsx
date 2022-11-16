import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import { fetchAllEvents } from '~/apis/events';
import CompanyFooter from '~/components/Constants/CompanyFooter';
import Label from '~/components/Design/Label';
import MySwiper from '~/components/Design/Swiper';
import EventCard from '~/components/Events/EventCard';
import EventCardList from '~/components/Events/EventCardList';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import { DOCS_PATH } from '~/constants/path';
import { data } from '~/constants/seo';
import { EventSimpleType } from '~/types/eventType';

export async function getStaticProps() {
  const events = (await fetchAllEvents()).map(e => ({ ...e }));

  return {
    props: { events },
  };
}

interface Props {
  events: Array<EventSimpleType>;
}

const Home = ({ events }: Props) => {
  return (
    <>
      <HeadMeta
        title={data.title}
        image={data.images.logo}
        description={data.description}
        url={data.url}
        creator={data.creator}
      />
      <div>
        <Intro />
        <TodayTicketSwiper events={events} />
        <AllTicketsList events={events} />
        <CompanyFooter />
      </div>
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
        priority={true}
      />
    </section>
  );
};

const TodayTicketSwiper = ({ events }: { events: Array<EventSimpleType> }) => {
  return (
    <section className="flex flex-col items-center w-full py-[60px] bg-white">
      <Label title="TODAY TICKETS" color="white" />
      <MySwiper className="mt-8">
        {events.map(({ id, name, description, image, salesTo }) => (
          <Link href={`/events/${id}`} key={id}>
            <a>
              <EventCard
                title={name}
                description={description}
                image={image}
                saleStatus={salesTo > new Date().getTime() ? '판매중' : '판매종료'}
                overlap={true}
              />
            </a>
          </Link>
        ))}
      </MySwiper>
    </section>
  );
};

const AllTicketsList = ({ events }: { events: Array<EventSimpleType> }) => {
  return (
    <section className="flex flex-col items-center w-full py-[60px] bg-black">
      <Label title="ALL TICKETS" color="blue" />
      <EventCardList events={events} />
    </section>
  );
};

Home.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="events">
    {page}
  </Layout>
);
export default Home;
