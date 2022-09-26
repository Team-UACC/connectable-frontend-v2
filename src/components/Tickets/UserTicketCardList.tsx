import Link from 'next/link';

import TicketCard from '~/components/Tickets/TicketCard';
import useTicketsOwnedByUserQuery from '~/hooks/apis/useTicketsOwnedByUserQuery';

const UserTicketCardList = () => {
  const { data: ticketList, isLoading, error } = useTicketsOwnedByUserQuery({ cacheTime: 0, staleTime: 0 });

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading...</div>;

  return (
    <ul className="relative flex flex-col w-full">
      {ticketList?.map((ticketData, idx) => (
        <li key={ticketData.tokenId} style={{ transform: `translateY(-${18 * idx}px)` }}>
          <Link href={`tickets/${ticketData.eventId}/${ticketData.id}`} className="relative w-full">
            <a>
              <TicketCard ticketData={ticketData} type="my" />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserTicketCardList;
