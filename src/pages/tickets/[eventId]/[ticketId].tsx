import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import FormOrderButton from '~/components/Button/FormOrderButton';
import NFTTransferButton from '~/components/Button/NFTTransferButton';
import QREntranceButton from '~/components/Button/QREntranceButton';
import ShareButton from '~/components/Button/ShareButton';
import LoadingSpinner from '~/components/Design/LoadingSpinner';
import FooterWrapper from '~/components/Footer/FooterWrapper';
import HeadMeta from '~/components/HeadMeta';
import TicketDetailArticle from '~/components/Tickets/TicketDetail/TicketDetailArticle';
import { data } from '~/constants/seo';
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
      <HeadMeta
        title={`NFT 티켓 | ${initialTicketDetailData.metadata.name}`}
        image={initialTicketDetailData.metadata.image}
        description={initialTicketDetailData.metadata.description}
        url={data.url + `/tickets/${initialTicketDetailData.eventId}/${initialTicketDetailData.id}`}
        creator={initialTicketDetailData.artistName}
      />
      <TicketDetailArticle
        ticketDetail={ticketDetail ?? initialTicketDetailData}
        eventDetail={initialEventDetailData}
      />

      <FooterWrapper>
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
                <QREntranceButton
                  color="pink"
                  ticketId={initialTicketDetailData.id}
                  ticketName={initialTicketDetailData.metadata.name}
                  eventLocation={initialEventDetailData.location}
                  eventDate={initialEventDetailData.startTime}
                />
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
      </FooterWrapper>
    </>
  );
};

export default TicketDetailPage;
