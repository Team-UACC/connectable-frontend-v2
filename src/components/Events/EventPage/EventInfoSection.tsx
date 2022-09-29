import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

import SpeeachBubble from '~/components/Design/SpeechBubble';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import EventSaleTimer from '../EventSaleTimer';

const EventInfoSection = ({ eventDetail }: { eventDetail: EventDetailType }) => {
  return (
    <section className="px-4 pb-6 ">
      <SpeeachBubble className="-translate-y-2 " color={eventDetail.endTime < new Date().getTime() ? 'gray' : 'pink'}>
        <EventSaleTimer endTime={eventDetail.endTime} />
      </SpeeachBubble>
      <span className="text-sm font-semibold text-gray5">
        {eventDetail.totalTicketCount}개 중 {eventDetail.totalTicketCount - eventDetail.onSaleTicketCount}개 판매 완료
      </span>
      <div className="mt-3">
        <EventInfos startTime={eventDetail.startTime} endTime={eventDetail.endTime} location={eventDetail.location} />
      </div>
    </section>
  );
};

export const EventInfos = ({
  startTime,
  endTime,
  location,
  size = 24,
}: {
  startTime?: number;
  endTime?: number;
  location?: string;
  size?: number;
}) => {
  const [eventStart, setEventStart] = useState('');

  useEffect(() => {
    setEventStart(dayjsKO(startTime ?? 0).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, [startTime]);

  return (
    <>
      {location && (
        <TextInfo
          term={<Image src="/icons/icon_location_24.svg" alt="location" width={size} height={size} />}
          description={location}
        />
      )}
      {startTime && (
        <TextInfo
          term={<Image src="/icons/icon_calendar_24.svg" alt="calendar" width={size} height={size} />}
          description={eventStart}
        />
      )}
      {startTime && endTime && (
        <TextInfo
          term={<Image src="/icons/icon_hourglass_24.svg" alt="hourglass" width={size} height={size} />}
          description={`${Math.floor((endTime - startTime) / 1000 / 60)}분`}
        />
      )}
    </>
  );
};

interface TextInfoProps {
  term: ReactNode;
  description: string;
}

const TextInfo = ({ term, description }: TextInfoProps) => {
  return (
    <div className="relative flex items-center w-full mt-2">
      {term}
      <span className="ml-2">{description}</span>
    </div>
  );
};

export default EventInfoSection;
