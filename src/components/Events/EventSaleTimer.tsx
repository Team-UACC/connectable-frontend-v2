import { useState } from 'react';

import BodyText from '~/components/Design/BodyText';
import useTimer from '~/hooks/useTimer';
import { timeFormatter } from '~/utils/day';

interface Props {
  endTime: number;
}

export default function EventSaleTimer({ endTime }: Props) {
  const [finish, setFinish] = useState(false);
  const { remaingTime, loading } = useTimer({ endTime, setFinish });

  return (
    <BodyText>
      {finish ? (
        <>판매가 종료되었습니다. 다음에 만나요!</>
      ) : (
        <>
          판매 종료까지 <span className="font-bold ">{loading ? '...' : timeFormatter(remaingTime)}</span>
        </>
      )}
    </BodyText>
  );
}
