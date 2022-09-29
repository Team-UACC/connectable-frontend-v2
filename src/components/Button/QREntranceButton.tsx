import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button, { ButtonProps } from '../Design/Button';

interface Props extends ButtonProps {
  ticketId: number;
}

const QREntranceButton = ({ ticketId, ...rest }: Props) => {
  const { showModal } = useModalStore();
  const { isLoggedIn } = useUserStore();
  return (
    <Button
      {...rest}
      onClick={() => {
        if (!isLoggedIn) {
          toast.error('로그인이 필요합니다.');
        } else {
          showModal('QR 입장', 'QR입장');
        }
      }}
    >
      QR 입장
    </Button>
  );
};

export default QREntranceButton;
