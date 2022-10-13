import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import toast from 'react-hot-toast';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import EventGuidances from '~/components/Constants/EventGudiances';
import BottomSheet from '~/components/Design/BottomSheet';
import Button from '~/components/Design/Button';
import EventCard from '~/components/Events/EventCard';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import EventInfoSection from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import TicketCountingForm from '~/components/Events/TicketCountingForm';
import FooterWrapper from '~/components/Footer/FooterWrapper';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Text/Paragraph';
import * as seo from '~/constants/seo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import { useBottomSheetModalStore } from '~/stores/bottomSheetModal';
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

  const { showBottomSheetModal, resetBottomSheetModal } = useBottomSheetModalStore();

  const { data, refetch: refetchEventDetail } = useEventByIdQuery(Number(eventId), {
    initialData: eventDetail,
  });

  useEffect(() => {
    if (router.isReady) {
      refetchEventDetail();
    }
  }, [router, refetchEventDetail]);

  useEffect(() => {
    resetBottomSheetModal();
  }, [resetBottomSheetModal]);

  return (
    <>
      <HeadMeta
        title={`컬렉션 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={seo.data.url + `/events/${eventDetail.id}`}
        creator={eventDetail.artistName}
      />
      <div className="pb-[88px] bg-white divide-y-[12px] divide-[#F5F5F5]">
        <section>
          <EventCard
            title={eventDetail.name}
            description={'short description'}
            image={eventDetail.image}
            overlap={true}
            isFull={true}
          />
          <EventInfoSection eventDetail={data ?? eventDetail} />
        </section>
        <ArtistSection artistImage={eventDetail.artistImage} artistName={eventDetail.artistName} />

        <section className="px-4 py-6 ">
          <Paragraph title="공연 설명">{eventDetail.description}</Paragraph>
        </section>

        <EventGuidances eventName={eventDetail.name} />

        <NFTCollectionInfoSection
          contractAddress={eventDetail.contractAddress}
          openseaUrl={eventDetail.contractAddress}
        />
      </div>
      <FooterWrapper>
        <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />
        <div className="flex gap-3 px-4 pb-4 bg-white ">
          {eventDetail.salesOption === 'FLAT_PRICE' && (
            <Button
              color="white"
              onClick={() => {
                if (eventDetail.salesTo < new Date().getTime()) {
                  toast.error('판매가 종료된 티켓입니다.');
                } else {
                  showBottomSheetModal({
                    bottomSheetModalName: '티켓 구매하기',
                    children: <TicketCountingForm eventId={eventDetail.id} price={eventDetail.price} />,
                  });
                }
              }}
            >
              바로 구매하기
            </Button>
          )}
          <Link href={`/events/${eventDetail.id}/sales`}>
            <Button color="black">티켓 선택</Button>
          </Link>
        </div>
      </FooterWrapper>
      <BottomSheet />
    </>
  );
};

EventPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-transparent" selectedFooter={null}>
    {page}
  </Layout>
);
export default EventPage;
