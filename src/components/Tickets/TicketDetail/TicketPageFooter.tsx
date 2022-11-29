import Link from 'next/link';
import { useQuery } from 'react-query';

import { fetchTicketsDetail } from '~/apis/events';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';

import FormOrderButton from '../../Button/FormOrderButton';
import NFTTransferButton from '../../Button/NFTTransferButton';
import QREntranceButton from '../../Button/QREntranceButton';
import ShareButton from '../../Button/ShareButton';
import Button from '../../Design/Button';
import FooterWrapper from '../../Footer/FooterWrapper';

export interface TicketPageFooterProps {
  ticketId: number;
  eventId: number;
}

const TicketPageFooter = ({ ticketId, eventId }: TicketPageFooterProps) => {
  const { klaytnAddress } = useUserStore();

  const { data: ticketDetail } = useQuery(
    ['ticket', eventId, ticketId, 'owner'],
    () => fetchTicketsDetail(eventId, ticketId),
    { suspense: true }
  );

  const { data: eventDetail } = useEventByIdQuery(Number(eventId)) as { data: EventDetailType };

  const isOwner = ticketDetail && klaytnAddress.toLowerCase() === ticketDetail.ownedBy.toLowerCase();
  const isUsed = ticketDetail && ticketDetail.used;

  const isOnSale = ticketDetail && ticketDetail.ticketSalesStatus === 'ON_SALE';

  if (!klaytnAddress) {
    return null;
  }

  return (
    <FooterWrapper>
      <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />
      <div className="flex gap-3 px-4 pb-4 bg-white ">
        {isOwner && (
          <>
            <ShareButton />
            <NFTTransferButton
              color="black"
              blockchain="Klaytn"
              eventId={Number(eventDetail.id)}
              ticketId={Number(ticketDetail.id)}
            />
            {!isUsed && (
              <QREntranceButton
                color="pink"
                ticketId={ticketDetail.id}
                ticketName={ticketDetail.metadata.name}
                eventLocation={eventDetail.location}
                eventDate={eventDetail.startTime}
              />
            )}
          </>
        )}

        {ticketDetail &&
          !isOwner &&
          (isOnSale ? (
            <FormOrderButton
              color="black"
              amount={ticketDetail.price}
              ticketIdList={[ticketDetail.id]}
              eventId={Number(eventDetail.id)}
            />
          ) : (
            <Link href={`/events/${eventDetail.id}`}>
              <Button color="black">컬렉션 페이지로 이동</Button>
            </Link>
          ))}
      </div>
    </FooterWrapper>
  );
};

export default TicketPageFooter;
