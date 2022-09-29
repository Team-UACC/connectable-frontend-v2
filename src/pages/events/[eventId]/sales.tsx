import { useRouter } from 'next/router';
import { ReactElement, useRef, useState } from 'react';

import Button from '~/components/Design/Button';
import Layout from '~/components/Layout';
import OrderTicketCard from '~/components/Tickets/TicketCard';
import TicketSkeleton from '~/components/Tickets/TicketSkeleton';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import useFullScreenModal from '~/hooks/useFullScreenModal';

const EventSalesPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const { showOrderModal } = useFullScreenModal();

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
              <li
                key={ticketData.tokenId}
                style={{ transform: `translateY(-${18 * idx}px)` }}
                className={ticketData.ticketSalesStatus !== 'ON_SALE' ? 'opacity-50' : ''}
              >
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
            showOrderModal({
              amount: ticketList!.reduce((total, v) => (checkedSetRef.current.has(v.id) ? total + v.price : total), 0),
              ticketIdList: Array.from(checkedSetRef.current),
              eventId: Number(eventId),
            });
          }}
        >{`티켓 ${selectedCount}장 결제하기`}</Button>
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
