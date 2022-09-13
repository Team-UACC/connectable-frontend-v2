import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Button from '~/components/Design/Button';
import EventCard from '~/components/Events/EventCard';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import EventInfoSection from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import { EventDetailType } from '~/types/eventType';

const EVENT: EventDetailType = {
  id: 2,
  name: "LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)",
  image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg',
  artistName: '렛츠락 페스티벌',
  artistImage: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg',
  description:
    '2년 만에 돌아온 렛츠락 페스티벌, 난지한강공원 일대에서 진행됩니다! 올 가을 뜨겁게 달궈 줄 도심 속 음악 축제, 가을의 시작은 렛츠락으로! 한정 수량으로 발매되는 렛츠락 페스티벌의 NFT 티켓을 만나보세요!',
  contractAddress: '0xf66624de7a5a3eba6534ee93bb01fee5de5cc6b1',
  openseaUrl: 'https://opensea.io/collection/lets-rock-festival-connectable',
  salesFrom: 1662390000000,
  salesTo: 1663923600000,
  twitterUrl: 'https://www.instagram.com/letsrockfe/',
  instagramUrl: 'https://www.instagram.com/letsrockfe/',
  webpageUrl: 'http://letsrock.co.kr/',
  totalTicketCount: 50,
  onSaleTicketCount: 47,
  startTime: 1664010000000,
  endTime: 1664096400000,
  price: 145000,
  location: '난지한강공원',
  salesOption: 'FLAT_PRICE',
};

export async function getStaticPaths() {
  return { paths: [{ params: { eventId: '1' } }], fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: {
      eventDetail: EVENT,
    },
  };
}

interface Props {
  eventDetail: EventDetailType;
}

const EventPage = ({ eventDetail }: Props) => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <article className="pb-[88px]">
      <EventCard
        title={eventDetail.name}
        description={'short description'}
        image={eventDetail.image}
        overlap={true}
        isFull={true}
      />
      <EventInfoSection eventDetail={eventDetail} />
      <ArtistSection artistImage={eventDetail.artistImage} artistName={eventDetail.artistName} />
      <section className="px-4 py-6 border-b-[12px] border-[#F5F5F5]">
        <Paragraph title="공연 설명">{eventDetail.description}</Paragraph>
      </section>
      <NFTCollectionInfoSection
        contractAddress={eventDetail.contractAddress}
        openseaUrl={eventDetail.contractAddress}
      />
      <footer className="fixed w-full max-w-[428px] p-4 bg-white bottom-0 z-50">
        <Button color="black">티켓 선택</Button>
      </footer>
    </article>
  );
};

EventPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-transparent" selectedFooter={null}>
    {page}
  </Layout>
);
export default EventPage;
