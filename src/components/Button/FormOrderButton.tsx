import toast from 'react-hot-toast';

import Button, { ButtonProps } from '~/components/Design/Button';
import useFullScreenModal from '~/hooks/useFullScreenModal';
import { useUserStore } from '~/stores/user';

interface Props extends ButtonProps {
  amount: number;
  ticketIdList: Array<number>;
  eventId: number;
}

const FormOrderButton = ({ amount, ticketIdList, eventId, children, ...rest }: Props) => {
  const { isLoggedIn } = useUserStore();

  const { showOrderModal } = useFullScreenModal();

  return (
    <Button
      {...rest}
      onClick={() => {
        if (isLoggedIn) {
          showOrderModal({ amount, ticketIdList, eventId });
        } else {
          toast.error('로그인이 필요합니다.');
        }
      }}
    >
      {children ?? '구매하기'}
    </Button>
  );
};

export default FormOrderButton;
