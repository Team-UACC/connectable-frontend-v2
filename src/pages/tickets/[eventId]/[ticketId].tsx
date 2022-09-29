import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import FormOrderButton from '~/components/Button/FormOrderButton';
import NFTTransferButton from '~/components/Button/NFTTransferButton';
import QREntranceButton from '~/components/Button/QREntranceButton';
import ShareButton from '~/components/Button/ShareButton';
import Button from '~/components/Design/Button';
import LoadingSpinner from '~/components/Design/LoadingSpinner';
import ArtistSection from '~/components/Events/EventPage/ArtistSection';
import EventInfoSection, { EventInfos } from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Paragraph from '~/components/Paragraph';
import { TicketSalesInfo } from '~/components/Tickets/TicketCard';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = await Promise.all(
    events.map(async e => {
      const eventId = e.id.toString();
      const tickets = await fetchEventsAllTickets(Number(eventId));

      const paramsList = tickets.map(t => ({ params: { eventId, ticketId: t.id.toString() } }));

      return paramsList;
    })
  );

  return { paths: paths.flat(), fallback: false };
}

export async function getStaticProps(context: GetServerSidePropsContext<{ eventId: string; ticketId: string }>) {
  if (!context.params) return;

  const { eventId, ticketId } = context.params;

  const [eventDetail, ticketDetail] = await Promise.all([
    fetchEventsDetail(Number(eventId)),
    fetchTicketsDetail(Number(eventId), Number(ticketId)),
  ]);

  return {
    props: {
      initialEventDetailData: eventDetail,
      initialTicketDetailData: { ...ticketDetail, ticketSalesStatus: '' },
    },
  };
}

interface Props {
  initialTicketDetailData: Ticket;
  initialEventDetailData: EventDetailType;
}

const TicketDetailPage = ({ initialTicketDetailData, initialEventDetailData }: Props) => {
  const router = useRouter();
  const { eventId, ticketId } = router.query;

  const { isLoggedIn, klaytnAddress } = useUserStore();

  const {
    data: ticketDetail,
    isLoading: isTicketDataLoading,
    refetch: refetchTicketDetail,
  } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  const {
    data: eventDetail,
    isLoading: isEventDataLoading,
    refetch: refetchEventDetail,
  } = useEventByIdQuery(Number(eventId));

  useEffect(() => {
    if (router.isReady) {
      refetchEventDetail();
      refetchTicketDetail();
    }
  }, [refetchEventDetail, refetchTicketDetail, router]);

  if (isTicketDataLoading || isEventDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <article className="pb-[88px] bg-white divide-y-[12px] divide-[#F5F5F5]">
        <div>
          <section className="relative w-full max-h-[428px]">
            <Image
              src={'/images/hologram.svg'}
              alt="bg"
              layout="responsive"
              width={428}
              height={428}
              className="scale-[120%]"
            />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-max drop-shadow-[6px_6px_18px_rgba(0,0,0,0.25)]">
              <Image
                src={ticketDetail!.metadata.image}
                alt={'ticket'}
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            </div>
          </section>
          <div className="px-[18px] pt-6 pb-5">
            <section className="flex flex-col w-full gap-3">
              <TicketSalesInfo ticketData={ticketDetail ?? initialTicketDetailData} badgeSize="lg" fontSize="lg" />
            </section>
            <section>
              <EventInfos
                size={18}
                startTime={initialEventDetailData.startTime}
                location={initialEventDetailData.location}
              />
            </section>
          </div>
        </div>
        <div>
          <section className="px-4 py-6">
            <Paragraph title="공연 설명">{initialEventDetailData.description}</Paragraph>
          </section>

          <NFTCollectionInfoSection
            contractAddress={initialEventDetailData.contractAddress}
            openseaUrl={initialEventDetailData.contractAddress}
            ownedBy={ticketDetail?.ownedBy}
            tokenId={initialTicketDetailData.tokenId}
          />
        </div>
      </article>

      <footer className={`fixed w-full max-w-layout bottom-0 z-10`}>
        <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />
        <div className="flex gap-3 px-4 pb-4 bg-white ">
          {ticketDetail && klaytnAddress === ticketDetail.ownedBy ? (
            <>
              <ShareButton />
              <NFTTransferButton
                color="black"
                blockchain="Klaytn"
                eventId={Number(eventId)}
                ticketId={Number(ticketId)}
              />
              {ticketDetail && !ticketDetail.used && (
                <QREntranceButton color="pink" ticketId={initialTicketDetailData.id} />
              )}
            </>
          ) : ticketDetail && ticketDetail.ticketSalesStatus === 'ON_SALE' ? (
            <FormOrderButton
              color="black"
              amount={initialTicketDetailData.price}
              ticketIdList={[initialTicketDetailData.id]}
              eventId={Number(eventId)}
            />
          ) : (
            <ShareButton />
          )}
        </div>
      </footer>
    </>
  );
};

export default TicketDetailPage;
