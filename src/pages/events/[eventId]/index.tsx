import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import Button from '~/components/Design/Button';
import Counter from '~/components/Design/Counter';
import EventCard from '~/components/Events/EventCard';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import EventInfoSection from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useFullScreenModal from '~/hooks/useFullScreenModal';
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
  }, []);

  return (
    <>
      <article className="pb-[88px] bg-white divide-y-[12px] divide-[#F5F5F5]">
        <div>
          <EventCard
            title={eventDetail.name}
            description={'short description'}
            image={eventDetail.image}
            overlap={true}
            isFull={true}
          />
          <EventInfoSection eventDetail={data ?? eventDetail} />
        </div>
        <ArtistSection artistImage={eventDetail.artistImage} artistName={eventDetail.artistName} />
        <div>
          <section className="px-4 py-6 ">
            <Paragraph title="공연 설명">{eventDetail.description}</Paragraph>
          </section>
          <NFTCollectionInfoSection
            contractAddress={eventDetail.contractAddress}
            openseaUrl={eventDetail.contractAddress}
          />
        </div>
      </article>

      <footer className={`fixed w-full max-w-layout bottom-0 z-10`}>
        <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />
        <div className="flex gap-3 px-4 pb-4 bg-white ">
          {eventDetail.salesOption === 'FLAT_PRICE' && (
            <Button
              color="white"
              onClick={() => {
                showBottomSheetModal({
                  bottomSheetModalName: '티켓 구매하기',
                  children: <BottomSheetContent amount={eventDetail.price} />,
                });
              }}
            >
              바로 구매하기
            </Button>
          )}
          <Link href={`/events/${eventDetail.id}/sales`}>
            <Button color="black">티켓 선택</Button>
          </Link>
        </div>
      </footer>
    </>
  );
};

const BottomSheetContent = ({ amount }: { amount: number }) => {
  const router = useRouter();
  const { eventId } = router.query;

  const { showOrderModal } = useFullScreenModal();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(amount);

  const counterDivRef = useRef<HTMLDivElement>(null);

  const handleChangeCount = useCallback(
    (count: number) => {
      setTotalAmount(count * amount);
      setIsDisabled(count === 0);
    },
    [amount]
  );

  return (
    <div className="relative w-full px-4 py-3">
      <div className="font-bold">수량</div>
      <div className="flex items-center justify-between">
        <Counter deafultValue={1} max={5} ref={counterDivRef} handleChangeCount={handleChangeCount} />
        <div className="text-end">
          <div className="text-sm text-gray2">총 결제금액</div>
          <div className="mt-1 text-2xl font-semibold text-brand-pink">{totalAmount.toLocaleString('ko-KR')}원</div>
        </div>
      </div>
      <Button
        color="black"
        className="mt-3"
        onClick={() => {
          showOrderModal({ amount: totalAmount, ticketIdList: [], eventId: Number(eventId) });
        }}
        disabled={isDisabled}
      >
        결제하기
      </Button>
    </div>
  );
};

EventPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-transparent" selectedFooter={null}>
    {page}
  </Layout>
);
export default EventPage;
