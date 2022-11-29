import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

import FormOrderButton from '~/components/Button/FormOrderButton';
import Button from '~/components/Design/Button';
import LoadingSpinner from '~/components/Design/LoadingSpinner';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';

const TicketDetailArticle = dynamic(() => import('~/components/Tickets/TicketDetail/TicketDetailArticle'), {
  ssr: false,
});

interface Props {
  eventId: number;
  ticketId: number;
}

const TicketDetailModalPage = ({ eventId, ticketId }: Props) => {
  const { data: ticketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  return (
    <div className="relative w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <TicketDetailArticle eventId={eventId} ticketId={ticketId} />
      </Suspense>
      <footer className="fixed justify-center bottom-0 w-full p-[18px] flex gap-[18px] bg-white backdrop-blur-sm bg-opacity-50 ">
        <Link href={`/tickets/${eventId}/${ticketId}`}>
          <Button color="white">상세 페이지로 이동</Button>
        </Link>
        {ticketDetail?.ticketSalesStatus === 'ON_SALE' && (
          <FormOrderButton color="black" amount={ticketDetail.price} ticketIdList={[ticketId]} eventId={eventId} />
        )}
      </footer>
    </div>
  );
};

export default TicketDetailModalPage;
