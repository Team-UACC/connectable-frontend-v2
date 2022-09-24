import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useRef, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import Button from '~/components/Design/Button';
import Layout from '~/components/Layout';
import OrderTicketCard from '~/components/Tickets/OrderTicketCard';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
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

const EventSalesPage = ({ eventDetail }: Props) => {
  const router = useRouter();
  const { eventId } = router.query;

  const [selectedCount, setSelectedCount] = useState(0);

  const checkedSetRef = useRef<Set<number>>(new Set());

  const { data: ticketList } = useTicketsByEventIdQuery(Number(eventId), {
    staleTime: 0,
    onSuccess: () => (checkedSetRef.current = new Set<number>()),
    enabled: router.isReady,
  });

  const handleSelect = (id: number) => {
    if (checkedSetRef.current.has(id)) {
      setSelectedCount(now => now - 1);
    } else {
      setSelectedCount(now => now + 1);
    }

    checkedSetRef.current.has(id) ? checkedSetRef.current.delete(id) : checkedSetRef.current.add(id);
  };

  return (
    <div>
      <section className="relative w-full px-2 m-auto mt-[18px] drop-shadow-black pb-[120px]">
        <ul className="relative flex w-full flex-col gap-[18px]">
          {ticketList?.map(ticketData => (
            <li key={ticketData.tokenId}>
              <OrderTicketCard ticketData={ticketData} handleSelect={() => handleSelect(ticketData.id)} />
            </li>
          ))}
        </ul>
      </section>
      <footer className={`fixed w-full max-w-layout p-4 bg-white bg-opacity-30 backdrop-blur-lg bottom-0 z-10`}>
        <Button color="black">{`티켓 ${selectedCount}장 결제하기`}</Button>
      </footer>
    </div>
  );
};

EventSalesPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-white" selectedFooter={null} headerName={'티켓 목록'}>
    {page}
  </Layout>
);

export default EventSalesPage;
