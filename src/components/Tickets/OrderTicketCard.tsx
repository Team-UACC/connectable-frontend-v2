import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useRef, useState } from 'react';

import { TicketSimple } from '~/types/ticketType';

import Badge from '../Design/Badge';
import CheckBox from '../Design/CheckBox';

import styles from './OrderTicketCard.module.css';

interface Props {
  ticketData: TicketSimple;
  handleSelect: ChangeEventHandler;
}

const OrderTicketCard = ({ ticketData, handleSelect }: Props) => {
  const { ticketSalesStatus } = ticketData;

  const [isSelected, setIsSelected] = useState(false);

  const checkBoxRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.currentTarget.checked);
      handleSelect(e);
    },
    [handleSelect]
  );

  const shadowClassName = useMemo(
    () =>
      isSelected ? 'drop-shadow-[2px_2px_18px_rgba(254,82,176,0.12)]' : 'drop-shadow-[2px_2px_18px_rgba(0,0,0,0.12)]',
    [isSelected]
  );

  return (
    <div className={[shadowClassName, isSelected ? styles['cutout-selected-var'] : styles['cutout-var']].join(' ')}>
      <section
        className={[
          'relative flex min-w-max justify-between w-full p-[18px] bg-white rounded-md h-[146px] border-[1px] ',
          isSelected ? 'border-brand-pink-second' : 'border-white',
          styles.cutout,
        ].join(' ')}
      >
        <div className="flex">
          <Image src={ticketData.metadata.image} alt={ticketData.metadata.name} width={110} height={110} />
          <div className="relative flex flex-col ml-4 h-[110px] justify-between py-1">
            <Badge
              name={
                ticketSalesStatus === 'ON_SALE' ? '판매중' : ticketSalesStatus === 'PENDING' ? '승인대기중' : '판매완료'
              }
              size="sm"
            />
            <div className="mb-2">
              <div className="text-base font-semibold text-gray1">{ticketData.metadata.name}</div>
              <div className="text-sm text-brand-pink">
                판매가 <b>{ticketData.price.toLocaleString('ko-KR')}원</b>
              </div>
            </div>
            <div className="text-xs text-gray1">{`상세정보 보기 >`}</div>
          </div>
        </div>

        <div className="flex w-[42px] ml-3 items-center justify-end border-gray6 border-dashed border-l-[1px] ">
          <CheckBox
            id={ticketData.metadata.name}
            shape="circle"
            direction="col"
            label="선택"
            ref={checkBoxRef}
            handleChange={handleChange}
          />
        </div>
      </section>
    </div>
  );
};

export default OrderTicketCard;
