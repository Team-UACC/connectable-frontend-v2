import Link from 'next/link';

import TicketCard from '~/components/Tickets/TicketCard/TicketCard';
import useTicketsOwnedByUserQuery from '~/hooks/apis/useTicketsOwnedByUserQuery';

import TicketSkeleton from './TicketSkeleton';

const UserTicketCardList = () => {
  const {
    data: ticketList,
    isLoading,
    error,
  } = useTicketsOwnedByUserQuery({ cacheTime: 10 * 1000, staleTime: 10 * 1000 });

  if (error) return <div>error</div>;

  if (isLoading)
    return (
      <ul className="relative flex flex-col w-full">
        <TicketSkeleton />
        <TicketSkeleton />
        <TicketSkeleton />
        <TicketSkeleton />
      </ul>
    );

  return (
    <ul className="relative flex flex-col w-full pb-8">
      {ticketList?.map(ticketData => (
        <li key={ticketData.tokenId} style={{ marginBottom: `-${18}px` }}>
          <Link href={`tickets/${ticketData.eventId}/${ticketData.id}`} className="relative w-full">
            <a>
              <TicketCard ticketData={ticketData} cutout="right" hasSelect={false} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserTicketCardList;
