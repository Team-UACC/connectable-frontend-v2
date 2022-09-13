import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import Button from '~/components/Design/Button';
import EventCard from '~/components/Events/EventCard';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import EventInfoSection from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import { EventDetailType } from '~/types/eventType';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const eventDetail = await fetchEventsDetail(Number(params?.eventId));
  return {
    props: {
      eventDetail,
    },
  };
}

interface Props {
  eventDetail: EventDetailType;
}

const EventPage = ({ eventDetail }: Props) => {
  const router = useRouter();
  const { eventId } = router.query;

  const { data, refetch: refetchEventDetail } = useEventByIdQuery(Number(eventId), {
    initialData: eventDetail,
  });

  useEffect(() => {
    if (router.isReady) {
      refetchEventDetail();
    }
  }, [router, refetchEventDetail]);

  return (
    <article className="pb-[88px]">
      <EventCard
        title={eventDetail.name}
        description={'short description'}
        image={eventDetail.image}
        overlap={true}
        isFull={true}
      />
      <EventInfoSection eventDetail={data ?? eventDetail} />
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
