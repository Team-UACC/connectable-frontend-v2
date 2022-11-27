import { ChangeEvent } from 'react';

import TicketCard from '~/components/Tickets/TicketCard/TicketCard';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';

export interface SaleTicketListProps {
  eventId: number;
  handleSelect: (e: ChangeEvent<HTMLInputElement>, id: number, price: number) => void;
  onSuccessFetch: () => void;
}

const SaleTicketList = ({ eventId, handleSelect, onSuccessFetch }: SaleTicketListProps) => {
  const { data: ticketList } = useTicketsByEventIdQuery(eventId, {
    staleTime: 0,
    cacheTime: 0,
    onSuccess: onSuccessFetch,
    suspense: true,
  });

  return ticketList?.map(ticketData => (
    <li
      key={ticketData.tokenId}
      style={{ marginBottom: `-${18}px` }}
      className={ticketData.ticketSalesStatus !== 'ON_SALE' ? 'opacity-50' : ''}
    >
      <TicketCard ticketData={ticketData} handleSelect={e => handleSelect(e, ticketData.id, ticketData.price)} />
    </li>
  ));
};

export default SaleTicketList;
