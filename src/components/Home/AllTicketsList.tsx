import useAllEvents from '~/hooks/apis/useAllEvents';
import { EventSimpleType } from '~/types/eventType';

import Label from '../Design/Label';
import EventCardList from '../Events/EventCardList';

const AllTicketsList = () => {
  const { data: events } = useAllEvents() as { data: Array<EventSimpleType> };

  return (
    <section className="flex flex-col items-center w-full py-[60px] bg-black">
      <Label title="ALL TICKETS" color="blue" />
      <EventCardList events={events} />
    </section>
  );
};

export default AllTicketsList;
