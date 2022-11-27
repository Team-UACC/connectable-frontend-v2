import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { ChangeEvent, ReactElement, Suspense, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { dehydrate, QueryClient } from 'react-query';

import { fetchAllEvents } from '~/apis/events';
import Button from '~/components/Design/Button';
import { SaleTicketListProps } from '~/components/Events/SalePage/SaleTicketList';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import TicketSkeleton from '~/components/Tickets/TicketCard/TicketSkeleton';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import * as seo from '~/constants/seo';
import useEventByIdQuery, { prefetchEventById } from '~/hooks/apis/useEventByIdQuery';
import useFullScreenModal from '~/hooks/useFullScreenModal';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';

const SaleTicketList = dynamic<SaleTicketListProps>(
  () => import('~/components/Events/SalePage/SaleTicketList') as any,
  {
    suspense: true,
    ssr: true,
  }
);

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params) return null;
  const { eventId } = params;

  const queryClient = new QueryClient();

  await prefetchEventById({ queryClient, eventId: Number(eventId) });

  return {
    props: {
      eventId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

interface Props {
  eventId: string;
}

const EventSalesPage = ({ eventId }: Props) => {
  const { data: eventDetail } = useEventByIdQuery(Number(eventId)) as { data: EventDetailType };
  const { renderTicketList, renderBuyButton } = useTicketCounting({
    maxCount: 4,
    eventId: Number(eventId),
  });

  return (
    <>
      <HeadMeta
        title={`티켓 판매 목록 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={seo.data.url + `/events/${eventDetail.id}/sales`}
        creator={eventDetail.artistName}
      />
      <div>
        <div className="font-semibold text-center text-gray2">
          {eventDetail.salesOption === 'FLAT_PRICE' ? '* 모두 동일한 기능의 티켓입니다. *' : undefined}
        </div>
        <section className="relative w-full m-auto pb-[120px]">
          <ul className="relative flex flex-col w-full">{renderTicketList()}</ul>
        </section>
        <footer className={`fixed w-full max-w-layout p-4 bg-white bg-opacity-30 backdrop-blur-lg bottom-0 z-10`}>
          {renderBuyButton()}
        </footer>
      </div>
    </>
  );
};

const useTicketCounting = ({ maxCount, eventId }: { maxCount: number; eventId: number }) => {
  const { isLoggedIn } = useUserStore();

  const [selectedCount, setSelectedCount] = useState(0);
  const { showOrderModal } = useFullScreenModal();

  const checkedSetRef = useRef<Set<number>>(new Set());
  const amountRef = useRef<number>(0);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: number, price: number) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.currentTarget.checked = false;
      toast(<LoginRequestToast />);
      return;
    }

    if (checkedSetRef.current.size >= maxCount) {
      e.preventDefault();
      e.currentTarget.checked = false;
      toast.error(`최대 ${maxCount}개까지 구매할 수 있어요.`);
      return;
    }

    // count, id, price를 하나로 관리하려면..? -> state와 ref로 분리했던 이유를 되짚어보자
    if (checkedSetRef.current.has(id)) {
      setSelectedCount(now => now - 1);
      checkedSetRef.current.delete(id);
      amountRef.current -= price;
    } else {
      setSelectedCount(now => now + 1);
      checkedSetRef.current.add(id);
      amountRef.current += price;
    }
  };

  const onSuccessFetch = () => {
    setSelectedCount(0);
    checkedSetRef.current = new Set<number>();
    amountRef.current = 0;
  };

  const renderTicketList = () => (
    <Suspense fallback={<Skeletons />}>
      <SaleTicketList eventId={eventId} handleSelect={handleSelect} onSuccessFetch={onSuccessFetch} />
    </Suspense>
  );

  const renderBuyButton = () => (
    <Button
      color="black"
      onClick={() => {
        if (!isLoggedIn) {
          toast(<LoginRequestToast />);
        } else {
          showOrderModal({
            amount: amountRef.current,
            ticketIdList: Array.from(checkedSetRef.current),
            eventId: Number(eventId),
          });
        }
      }}
      disabled={selectedCount === 0}
    >{`티켓 ${selectedCount}장 구매하기`}</Button>
  );

  return { renderTicketList, renderBuyButton };
};

const Skeletons = () => (
  <>
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
    <TicketSkeleton />
  </>
);

EventSalesPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-white" selectedFooter={null} headerName={'티켓 목록'} bgColor="white">
    {page}
  </Layout>
);

export default EventSalesPage;
