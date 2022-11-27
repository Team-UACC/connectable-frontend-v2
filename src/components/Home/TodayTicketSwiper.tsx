import Link from 'next/link';

import useAllEvents from '~/hooks/apis/useAllEvents';
import { EventSimpleType } from '~/types/eventType';

import Label from '../Design/Label';
import MySwiper from '../Design/Swiper';
import EventCard from '../Events/EventCard';

const TodayTicketSwiper = () => {
  const { data: events } = useAllEvents() as { data: Array<EventSimpleType> };
  return (
    <section className="flex flex-col items-center w-full py-[60px] bg-white">
      <Label title="TODAY TICKETS" color="white" />
      <MySwiper className="mt-8">
        {events.map(({ id, name, description, image, salesTo }) => (
          <Link href={`/events/${id}`} key={id}>
            <a>
              <EventCard
                title={name}
                description={description}
                image={image}
                saleStatus={salesTo > new Date().getTime() ? '판매중' : '판매종료'}
                overlap={true}
              />
            </a>
          </Link>
        ))}
      </MySwiper>
    </section>
  );
};

export default TodayTicketSwiper;
