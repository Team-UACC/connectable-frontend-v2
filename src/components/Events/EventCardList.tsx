import Link from 'next/link';
import { useMemo } from 'react';

import { EventSimpleType } from '~/types/eventType';

import EventCard from './EventCard';

const EventCardList = ({ events, theme = 'white' }: { events: Array<EventSimpleType>; theme?: 'white' | 'black' }) => {
  const length = useMemo(() => events.length, [events]);

  return (
    <ul className="flex flex-wrap w-full justify-evenly ">
      {events.map(({ id, name, description, image, salesTo }) => (
        <Link href={`/events/${id}`} key={id}>
          <a className=" basis-[45%] mt-8 ">
            <EventCard
              title={name}
              titleColor={theme}
              description={description}
              image={image}
              saleStatus={salesTo > new Date().getTime() ? '판매중' : '판매종료'}
              overlap={false}
            />
          </a>
        </Link>
      ))}
      {length % 2 === 1 && <div className=" basis-[45%] mt-8 " />}
    </ul>
  );
};

export default EventCardList;
