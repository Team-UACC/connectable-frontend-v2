import Image from 'next/image';
import { memo, ReactNode, useEffect, useState } from 'react';

import SpeeachBubble from '~/components/Design/SpeechBubble';
import { CALENDAR_ICON, HOURGLASS_ICON, LOCATION_ICON } from '~/constants/images';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import EventSaleTimer from '../EventSaleTimer';

const EventInfoSection = ({ eventDetail }: { eventDetail: EventDetailType }) => {
  return (
    <section className="px-4 pb-6 ">
      <SpeeachBubble className="-translate-y-2 " color={eventDetail.salesTo < new Date().getTime() ? 'gray' : 'pink'}>
        <EventSaleTimer endTime={eventDetail.salesTo} />
      </SpeeachBubble>
      <RemainingTicketsCount eventId={eventDetail.id} />
      <div className="mt-3">
        <EventInfos startTime={eventDetail.startTime} endTime={eventDetail.endTime} location={eventDetail.location} />
      </div>
    </section>
  );
};

const RemainingTicketsCount = ({ eventId }: { eventId: number }) => {
  const { data, isSuccess } = useEventByIdQuery(Number(eventId), { cacheTime: 5 * 1000 });

  return (
    <span className="text-sm font-semibold text-gray5">
      {isSuccess
        ? `${data.totalTicketCount}개 중 ${data.totalTicketCount - data.onSaleTicketCount}개 판매 완료`
        : '...'}
    </span>
  );
};

export const EventInfos = memo(
  ({
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
            term={<Image src={LOCATION_ICON} alt="location" width={size} height={size} />}
            description={location}
          />
        )}
        {startTime && (
          <TextInfo
            term={<Image src={CALENDAR_ICON} alt="calendar" width={size} height={size} />}
            description={eventStart}
          />
        )}
        {startTime && endTime && (
          <TextInfo
            term={<Image src={HOURGLASS_ICON} alt="hourglass" width={size} height={size} />}
            description={`${Math.floor((endTime - startTime) / 1000 / 60)}분`}
          />
        )}
      </>
    );
  }
);

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
