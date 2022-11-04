import { useCallback, useRef, useState } from 'react';

import useFullScreenModal from '~/hooks/useFullScreenModal';

import Button from '../Design/Button';
import Counter from '../Design/Counter';

const TicketCountingForm = ({
  eventId,
  price,
  defaultValue = 1,
  maxValue,
}: {
  eventId: number;
  price: number;
  defaultValue?: number;
  maxValue?: number;
}) => {
  const { showOrderModal } = useFullScreenModal();

  const { handleChangeCount, totalCount, isDisabled } = useTicketCountingForm({ defaultCount: defaultValue });

  return (
    <div className="relative w-full px-4 py-3">
      <div className="font-bold">수량</div>
      <div className="flex items-center justify-between">
        <Counter deafultValue={defaultValue} max={maxValue ?? 4} handleChangeCount={handleChangeCount} />
        <div className="text-end">
          <div className="text-sm text-gray2">총 결제금액</div>
          <div className="mt-1 text-2xl font-semibold text-brand-pink">
            {(totalCount * price).toLocaleString('ko-KR')}원
          </div>
        </div>
      </div>
      <Button
        color="black"
        className="mt-3"
        onClick={() => {
          showOrderModal({
            amount: totalCount * price,
            ticketIdList: new Array(totalCount).fill(0),
            eventId: Number(eventId),
          });
        }}
        disabled={isDisabled}
      >
        구매하기
      </Button>
    </div>
  );
};

const useTicketCountingForm = ({ defaultCount }: { defaultCount: number }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(defaultCount);

  const countRef = useRef<number>(0);

  const handleChangeCount = useCallback((count: number) => {
    setTotalCount(count);
    setIsDisabled(count === 0);
    countRef.current = count;
  }, []);

  return { isDisabled, totalCount, handleChangeCount };
};

export default TicketCountingForm;
