import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import FormOrderButton from '~/components/Button/FormOrderButton';
import NFTTransferButton from '~/components/Button/NFTTransferButton';
import QREntranceButton from '~/components/Button/QREntranceButton';
import ShareButton from '~/components/Button/ShareButton';
import Button from '~/components/Design/Button';
import FooterWrapper from '~/components/Footer/FooterWrapper';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
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
  const { data: ticketDetail } = useTicketByIdsQuery(initialEventDetailData.id, initialTicketDetailData.id, {
    staleTime: 0,
    cacheTime: 0,
  });

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
      {ticketDetail && <PageFooter ticketDetail={ticketDetail} eventDetail={initialEventDetailData} />}
    </>
  );
};

const PageFooter = ({ ticketDetail, eventDetail }: { ticketDetail: Ticket; eventDetail: EventDetailType }) => {
  const { klaytnAddress } = useUserStore();

  return (
    <FooterWrapper>
      <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />
      <div className="flex gap-3 px-4 pb-4 bg-white ">
        {ticketDetail && klaytnAddress.toLowerCase() === ticketDetail.ownedBy.toLowerCase() ? (
          <>
            <ShareButton />
            <NFTTransferButton
              color="black"
              blockchain="Klaytn"
              eventId={Number(eventDetail.id)}
              ticketId={Number(ticketDetail.id)}
            />
            {ticketDetail && !ticketDetail.used && (
              <QREntranceButton
                color="pink"
                ticketId={ticketDetail.id}
                ticketName={ticketDetail.metadata.name}
                eventLocation={eventDetail.location}
                eventDate={eventDetail.startTime}
              />
            )}
          </>
        ) : ticketDetail && ticketDetail.ticketSalesStatus === 'ON_SALE' ? (
          <FormOrderButton
            color="black"
            amount={ticketDetail.price}
            ticketIdList={[ticketDetail.id]}
            eventId={Number(eventDetail.id)}
          />
        ) : (
          <Link href={`/events/${eventDetail.id}`}>
            <Button color="black">컬렉션 페이지로 이동</Button>
          </Link>
        )}
      </div>
    </FooterWrapper>
  );
};

TicketDetailPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter={null} bgColor="white">
    {page}
  </Layout>
);

export default TicketDetailPage;
