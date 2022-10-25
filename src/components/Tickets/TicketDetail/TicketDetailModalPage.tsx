import Link from 'next/link';

import FormOrderButton from '~/components/Button/FormOrderButton';
import Button from '~/components/Design/Button';
import LoadingSpinner from '~/components/Design/LoadingSpinner';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import NotFoundPage from '~/pages/404';

import TicketDetailArticle from './TicketDetailArticle';

interface Props {
  eventId: number;
  ticketId: number;
}

const TicketDetailModalPage = ({ eventId, ticketId }: Props) => {
  const { data: evnetDetail, isLoading: isEventDataLoading } = useEventByIdQuery(Number(eventId));
  const { data: ticketDetail, isLoading: isTicketDataLoading } = useTicketByIdsQuery(
    Number(eventId),
    Number(ticketId),
    { staleTime: 0, cacheTime: 0 }
  );

  if (isEventDataLoading || isTicketDataLoading) {
    return <LoadingSpinner />;
  }

  if (!ticketDetail || !evnetDetail) {
    return <NotFoundPage />;
  }

  return (
    <div className="relative w-full">
      <TicketDetailArticle ticketDetail={ticketDetail} eventDetail={evnetDetail} />
      <footer className="fixed justify-center bottom-0 w-full p-[18px] flex gap-[18px] bg-white backdrop-blur-sm bg-opacity-50 ">
        <Link href={`/tickets/${eventId}/${ticketId}`}>
          <Button color="white">상세 페이지로 이동</Button>
        </Link>
        {ticketDetail.ticketSalesStatus === 'ON_SALE' && (
          <FormOrderButton color="black" amount={ticketDetail.price} ticketIdList={[ticketId]} eventId={eventId} />
        )}
      </footer>
    </div>
  );
};

export default TicketDetailModalPage;
