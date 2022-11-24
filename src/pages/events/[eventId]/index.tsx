import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import EventGuidances from '~/components/Constants/EventGudiances';
import BottomSheet from '~/components/Design/BottomSheet';
import Button from '~/components/Design/Button';
import SkeletonBox from '~/components/Design/SkeletonBox';
import EventCard from '~/components/Events/EventCard';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import BuyNowButton from '~/components/Events/EventPage/BuyNowButton';
import EventInfoSection from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import FooterWrapper from '~/components/Footer/FooterWrapper';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Text/Paragraph';
import queryKeys from '~/constants/queryKeys';
import * as seo from '~/constants/seo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import { useBottomSheetModalStore } from '~/stores/bottomSheetModal';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ eventId: string }>) {
  if (!params) return null;

  const { eventId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.events.byId(Number(eventId)), () => fetchEventsDetail(Number(eventId)));

  return {
    props: {
      eventId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

interface Props {
  eventId: number;
}

const EventPage = ({ eventId }: Props) => {
  const { resetBottomSheetModal } = useBottomSheetModalStore();

  const { data: eventDetail, isSuccess } = useEventByIdQuery(eventId);

  useEffect(() => {
    resetBottomSheetModal();
  }, [resetBottomSheetModal]);

  if (!isSuccess) return <PageSkeletion />;

  return (
    <>
      <HeadMeta
        title={`컬렉션 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={seo.data.url + `/events/${eventDetail.id}`}
        creator={eventDetail.artistName}
      />
      <div className="bg-white divide-y-[12px] divide-[#F5F5F5]">
        <section>
          <EventCard
            title={eventDetail.name}
            description={'NFT at CONNECTABLE'}
            image={eventDetail.image}
            overlap={true}
            isFull={true}
          />
          <EventInfoSection eventDetail={eventDetail} />
        </section>

        <ArtistSection
          artistId={eventDetail.artistId}
          artistImage={eventDetail.artistImage}
          artistName={eventDetail.artistName}
        />

        <Paragraph title="이벤트 설명">{eventDetail.description}</Paragraph>

        <div className="border-b-[12px] border-[#F5F5F5]">
          <EventGuidances eventName={eventDetail.name} />
        </div>

        <div className="sticky bottom-0 border-none">
          <FooterWrapper bgTopGradient={true} position="relative">
            <div className="flex gap-3 px-4 pb-4 bg-white ">
              {eventDetail.salesOption === 'FLAT_PRICE' ? (
                <BuyNowButton
                  eventId={eventDetail.id}
                  price={eventDetail.price}
                  endOfSale={eventDetail.salesTo < new Date().getTime()}
                />
              ) : (
                <LinkToSalesPageButton eventId={eventDetail.id} name={'티켓 구매하기'} />
              )}
            </div>
          </FooterWrapper>
        </div>

        {eventDetail.salesOption === 'FLAT_PRICE' && (
          <div className="p-4 border-none">
            <LinkToSalesPageButton eventId={eventDetail.id} name={'티켓 목록 확인하기'} />
          </div>
        )}

        <NFTCollectionInfoSection contractAddress={eventDetail.contractAddress} openseaUrl={eventDetail.openseaUrl} />
      </div>

      <BottomSheet />
    </>
  );
};

const LinkToSalesPageButton = ({ eventId, name = '티켓 선택' }: { eventId: number; name?: string }) => {
  return (
    <Link href={`/events/${eventId}/sales`}>
      <Button color="black">{name}</Button>
    </Link>
  );
};

const PageSkeletion = () => (
  <div>
    <SkeletonBox width={0} height={0} style={{ width: '100%', height: 'min(432px,100vw)', borderRadius: 'none' }} />

    <div className="p-4">
      <SkeletonBox width={250} height={16} className="mt-2 " />
      <SkeletonBox width={200} height={16} className="mt-2" />
      <SkeletonBox width={150} height={16} className="mt-3" />
      <SkeletonBox width={180} height={16} className="mt-3" />
      <SkeletonBox width={100} height={16} className="mt-3" />
    </div>

    <div className="flex p-4 mt-8">
      <SkeletonBox width={100} height={100} style={{ borderRadius: '9999px' }} />
      <div className="flex flex-col gap-4 p-4">
        <SkeletonBox width={80} height={16} />
        <SkeletonBox width={150} height={16} />
      </div>
    </div>
  </div>
);

EventPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-transparent" selectedFooter={null} bgColor="white">
    {page}
  </Layout>
);
export default EventPage;
