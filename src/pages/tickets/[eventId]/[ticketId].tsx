import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import FormOrderButton from '~/components/Button/FormOrderButton';
import NFTTransferButton from '~/components/Button/NFTTransferButton';
import QREntranceButton from '~/components/Button/QREntranceButton';
import ShareButton from '~/components/Button/ShareButton';
import LoadingSpinner from '~/components/Design/LoadingSpinner';
import { EventInfos } from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Paragraph from '~/components/Paragraph';
import { TicketSalesInfo } from '~/components/Tickets/TicketCard';
import TicketDetailArticle from '~/components/Tickets/TicketDetail/TicketDetailArticle';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
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

  const { klaytnAddress } = useUserStore();

  const {
    data: ticketDetail,
    isLoading: isTicketDataLoading,
    refetch: refetchTicketDetail,
  } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  useEffect(() => {
    if (router.isReady) {
      refetchTicketDetail();
    }
  }, [refetchTicketDetail, router]);

  if (isTicketDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <TicketDetailArticle
        ticketDetail={ticketDetail ?? initialTicketDetailData}
        eventDetail={initialEventDetailData}
      />

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
          ) : null}
        </div>
      </footer>
    </>
  );
};

export default TicketDetailPage;
