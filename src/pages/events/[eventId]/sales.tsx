import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useRef, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import Button from '~/components/Design/Button';
import OrderForm from '~/components/Form/OrderForm';
import Layout from '~/components/Layout';
import OrderTicketCard from '~/components/Tickets/TicketCard';
import TicketSkeleton from '~/components/Tickets/TicketSkeleton';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import { useModalStore } from '~/stores/modal';
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

  const { showModal } = useModalStore();

  const [selectedCount, setSelectedCount] = useState(0);

  const checkedSetRef = useRef<Set<number>>(new Set());

  const { data: ticketList, isLoading } = useTicketsByEventIdQuery(Number(eventId), {
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
      <section className="relative w-full m-auto pb-[120px]">
        <ul className="relative flex flex-col w-full">
          {isLoading ? (
            <>
              <TicketSkeleton />
              <TicketSkeleton />
              <TicketSkeleton />
              <TicketSkeleton />
              <TicketSkeleton />
            </>
          ) : (
            ticketList?.map((ticketData, idx) => (
              <li key={ticketData.tokenId} style={{ transform: `translateY(-${18 * idx}px)` }}>
                <OrderTicketCard ticketData={ticketData} handleSelect={() => handleSelect(ticketData.id)} />
              </li>
            ))
          )}
        </ul>
      </section>
      <footer className={`fixed w-full max-w-layout p-4 bg-white bg-opacity-30 backdrop-blur-lg bottom-0 z-10`}>
        <Button
          color="black"
          onClick={() => {
            showModal(
              '결제하기',
              <OrderForm
                amount={ticketList!.reduce(
                  (total, v) => (checkedSetRef.current.has(v.id) ? total + v.price : total),
                  0
                )}
                ticketIdList={Array.from(checkedSetRef.current)}
                eventId={Number(eventId)}
              />
            );
          }}
        >{`티켓 ${checkedSetRef.current.size}장 결제하기`}</Button>
      </footer>
    </div>
  );
};

EventSalesPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-white" selectedFooter={null} headerName={'티켓 목록'} bgColor="white">
    {page}
  </Layout>
);

export default EventSalesPage;
