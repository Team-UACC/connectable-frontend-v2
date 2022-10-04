import Image from 'next/image';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { requestEntranceVerification } from '~/apis/users';
import { EventInfos } from '~/components/Events/EventPage/EventInfoSection';

import TicketEntranceContainer from './TicketEntranceContainer';

interface Props {
  ticketId: number;
  ticketName: string;
  eventLocation: string;
  eventDate: number;
}

const DURATION = 30;

export default function QREntrance({ ticketId, eventDate, eventLocation, ticketName }: Props) {
  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [remainingTime, setRemainingTime] = useState(0);

  const { isLoading, isError } = useQuery(
    ['fetchEntranceVerification', ticketId],
    () => requestEntranceVerification({ ticketId }),
    {
      onSuccess: data => {
        setRemainingTime(DURATION);
        setQrvalue(JSON.stringify(data));
      },
      refetchInterval: DURATION * 1000,
      staleTime: 0,
      cacheTime: 0,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingTime(time => time - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [remainingTime]);

  if (isLoading || qrvalue === 'DEFAULT') {
    return <span className="font-bold">loading...</span>;
  }

  if (isError) {
    return <span className="font-bold">다시 시도해주세요</span>;
  }

  return (
    <div className="relative w-full text-black">
      <TicketEntranceContainer />
      <section className="absolute top-0 w-full p-16 ">
        <div className="relative w-full flex items-center justify-evenly h-[calc(min(100vw,428px)-80px)] border-b-[1px] border-dashed border-gray6 flex-col">
          <QRCode value={qrvalue} size={192} />
          <div className="flex w-max text-gray2">
            <Image src="/icons/icon_timer_24.svg" alt="timer" width={24} height={24} />
            <span className="ml-1 font-bold">
              남은 시간 <span className="font-normal text-brand-skyblue">{remainingTime}초</span>
            </span>
          </div>
          <span className="text-xs text-gray5 ">
            입장하려는 시설의 담당자에게 <br /> 위의 QR코드를 보여주세요.
          </span>
        </div>
      </section>
      <section className="absolute bottom-0 w-full p-16 h-[calc((min(100vw,428px)*0.3+96px))] flex flex-col justify-evenly">
        <div className="font-semibold text-gray1">{ticketName}</div>
        <div className="text-xs">
          <EventInfos size={18} startTime={eventDate} location={eventLocation} />
        </div>
      </section>
    </div>
  );
}
