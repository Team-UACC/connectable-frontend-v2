import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, ChangeEventHandler, useCallback, useRef, useState } from 'react';

import Badge from '~/components/Design/Badge';
import CheckBox from '~/components/Design/CheckBox';
import { EventInfos } from '~/components/Events/EventPage/EventInfoSection';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import useFullScreenModal from '~/hooks/useFullScreenModal';
import useShallowModal from '~/hooks/useShallowModal';
import { TicketSimple } from '~/types/ticketType';

import TicketCardBackground from './TicketCardBackground';

interface Props {
  ticketData: TicketSimple;
  hasSelect?: boolean;
  handleSelect?: ChangeEventHandler<HTMLInputElement>;
  cutout?: 'right' | 'left';
  borderColor?: 'none' | 'pink';
  shadowColor?: 'black' | 'pink';
}

const TicketCard = ({
  ticketData,
  hasSelect = true,
  handleSelect,
  cutout = 'left',
  borderColor,
  shadowColor,
}: Props) => {
  const { ticketSalesStatus } = ticketData;

  const router = useRouter();

  const [isSelected, setIsSelected] = useState(false);

  const { showTicketDetailModal } = useFullScreenModal();
  const { pushShallowUrl } = useShallowModal();

  const checkBoxRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleSelect && handleSelect(e);
      setIsSelected(e.currentTarget.checked);
    },
    [handleSelect]
  );

  return (
    <div className={['relative'].join(' ')}>
      <TicketCardBackground
        id={ticketData.id}
        cutout={cutout}
        shadowColor={shadowColor ?? isSelected ? 'pink' : 'black'}
        borderColor={borderColor ?? isSelected ? 'pink' : 'none'}
      />
      <section
        className={[
          'absolute w-full max-w-[464px] inset-0 px-[36px] py-[36px] flex  min-w-max justify-between min-h-[146px] ',
        ].join(' ')}
      >
        <div className="relative flex items-center w-full ">
          <div className="relative w-1/3 max-w-[100px] max-h-[100px]">
            <Image
              src={ticketData.metadata.image}
              alt={ticketData.metadata.name}
              layout="responsive"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <div
            className={[
              'relative  flex flex-col ml-4 min-h-[100px] justify-between py-1',
              hasSelect ? 'max-w-[min(190px,40vw)]' : 'max-w-[min(230px,50vw)]',
            ].join(' ')}
          >
            {hasSelect ? (
              <>
                <TicketSalesInfo ticketData={ticketData} />
                <a
                  className="text-xs text-gray1 hover:cursor-pointer"
                  onClick={() => {
                    pushShallowUrl(`/events/${router.query.eventId}/sales`);
                    showTicketDetailModal({ eventId: Number(router.query.eventId), ticketId: ticketData.id });
                  }}
                >{`상세정보 보기 >`}</a>
              </>
            ) : (
              <>
                <div className="text-xs text-brand-pink">{ticketData.artistName}</div>
                <div className="overflow-hidden text-sm font-semibold text-gray1 text-ellipsis whitespace-nowrap">
                  {ticketData.metadata.name}
                </div>
                <div className="text-xs text-gray3">
                  <EventInfos
                    size={18}
                    startTime={new Date(2022, 11, 18, 19, 30).getTime()}
                    location={'서울, 예술의 전당'}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {hasSelect && (
          <div className="flex w-[42px] ml-3 items-center justify-end border-gray6 border-dashed border-l-[1px] ">
            <CheckBox
              id={ticketData.metadata.name}
              shape="circle"
              direction="col"
              label="선택"
              ref={checkBoxRef}
              disabled={ticketSalesStatus !== 'ON_SALE'}
              handleChange={handleChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};

interface TicketSalesInfoProps {
  ticketData: TicketSimple;
  badgeSize?: 'sm' | 'lg';
  fontSize?: 'sm' | 'lg';
}

export const TicketSalesInfo = ({ ticketData, badgeSize = 'sm', fontSize = 'sm' }: TicketSalesInfoProps) => {
  return (
    <>
      <Badge
        name={
          ticketData.ticketSalesStatus === 'ON_SALE'
            ? '판매중'
            : ticketData.ticketSalesStatus === 'PENDING'
            ? '승인대기중'
            : '판매완료'
        }
        size={badgeSize ?? 'sm'}
      />
      <div className="mb-2">
        <div
          className={[
            'overflow-hidden font-semibold text-gray1 text-ellipsis whitespace-nowrap',
            fontSize === 'sm' ? 'text-sm' : 'text-xl',
          ].join(' ')}
        >
          {ticketData.metadata.name}
        </div>
        <div className={['mt-1 text-brand-pink', fontSize === 'sm' ? 'text-xs' : 'text-base'].join(' ')}>
          판매가 <b>{ticketData.price.toLocaleString('ko-KR')}원</b>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
