import HeadMeta from '~/components/HeadMeta';
import { data } from '~/constants/seo';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import { Ticket } from '~/types/ticketType';

interface Props {
  ticketId: number;
  eventId: number;
}

const TicketDetailHeadMeta = ({ eventId, ticketId }: Props) => {
  const { data: ticketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId)) as {
    data: Ticket;
  };

  return (
    <HeadMeta
      title={`NFT 티켓 | ${ticketDetail.metadata.name}`}
      image={ticketDetail.metadata.image}
      description={ticketDetail.metadata.description}
      url={data.url + `/tickets/${ticketDetail.eventId}/${ticketDetail.id}`}
      creator={ticketDetail.artistName}
    />
  );
};

export default TicketDetailHeadMeta;
