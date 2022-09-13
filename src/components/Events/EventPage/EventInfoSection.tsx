import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

import SpeeachBubble from '~/components/Design/SpeechBubble';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import EventSaleTimer from '../EventSaleTimer';

const EventInfoSection = ({ eventDetail }: { eventDetail: EventDetailType }) => {
  const [eventStart, setEventStart] = useState('');

  useEffect(() => {
    setEventStart(dayjsKO(eventDetail.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, [eventDetail.startTime]);

  return (
    <section className="px-4 pb-6 border-b-[12px] border-[#F5F5F5]">
      <SpeeachBubble className="-translate-y-2 ">
        <EventSaleTimer endTime={eventDetail.endTime} />
      </SpeeachBubble>
      <span className="text-sm font-semibold text-gray5">
        {eventDetail.totalTicketCount}개 중 {eventDetail.totalTicketCount - eventDetail.onSaleTicketCount}개 판매 완료
      </span>
      <div className="mt-3">
        <TextInfo
          term={<Image src="/icons/icon_location_24.svg" alt="location" width={24} height={24} />}
          description={eventDetail.location}
        />
        <TextInfo
          term={<Image src="/icons/icon_calendar_24.svg" alt="calendar" width={24} height={24} />}
          description={eventStart}
        />
        <TextInfo
          term={<Image src="/icons/icon_hourglass_24.svg" alt="hourglass" width={24} height={24} />}
          description={`${Math.floor((eventDetail.endTime - eventDetail.startTime) / 1000 / 60)}분`}
        />
      </div>
    </section>
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
