import toast from 'react-hot-toast';

import Button from '~/components/Design/Button';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { useBottomSheetModalStore } from '~/stores/bottomSheetModal';
import { useUserStore } from '~/stores/user';

import TicketCountingForm from '../TicketCountingForm';

const BuyNowButton = ({ eventId, price, endOfSale }: { eventId: number; price: number; endOfSale: boolean }) => {
  const { showBottomSheetModal } = useBottomSheetModalStore();
  const { isLoggedIn } = useUserStore();

  const handleOnClick = () => {
    if (!isLoggedIn) {
      toast(<LoginRequestToast />);
    } else {
      showBottomSheetModal({
        bottomSheetModalName: '티켓 구매하기',
        children: <TicketCountingForm eventId={eventId} price={price} />,
      });
    }
  };

  return (
    <Button color="white" onClick={handleOnClick} disabled={endOfSale}>
      {endOfSale ? '판매가 종료되었습니다.' : '바로 구매하기'}
    </Button>
  );
};

export default BuyNowButton;
