import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import { fetchAllEvents, fetchEventsAllTickets } from '~/apis/events';
import Layout from '~/components/Layout';
import TicketDetailArticle from '~/components/Tickets/TicketDetail/TicketDetailArticle';
import TicketDetailHeadMeta from '~/components/Tickets/TicketDetail/TicketDetailHeadMeta';
import { prefetchEventById } from '~/hooks/apis/useEventByIdQuery';
import { prefetchTicketById } from '~/hooks/apis/useTicketByIdsQuery';

const TicketPageFooter = dynamic(() => import('~/components/Tickets/TicketDetail/TicketPageFooter'), {
  ssr: false,
});

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

  const queryClient = new QueryClient();

  await Promise.all([
    prefetchEventById({ queryClient, eventId: Number(eventId) }),
    prefetchTicketById({ queryClient, eventId: Number(eventId), ticketId: Number(ticketId) }),
  ]);

  return {
    props: {
      eventId: eventId,
      ticketId: ticketId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

interface Props {
  eventId: string;
  ticketId: string;
}

const TicketDetailPage = ({ eventId, ticketId }: Props) => {
  const props = { ticketId: Number(ticketId), eventId: Number(eventId) };

  return (
    <>
      <TicketDetailHeadMeta {...props} />
      <TicketDetailArticle {...props} />
      <Suspense>
        <TicketPageFooter {...props} />
      </Suspense>
    </>
  );
};

TicketDetailPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter={null} bgColor="white">
    {page}
  </Layout>
);

export default TicketDetailPage;
