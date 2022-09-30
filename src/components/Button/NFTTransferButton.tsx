import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button, { ButtonProps } from '../Design/Button';

interface Props extends ButtonProps {
  blockchain?: 'Klaytn';
  eventId: number;
  ticketId: number;
}

const NFTTransferButton = ({ blockchain = 'Klaytn', eventId, ticketId, ...rest }: Props) => {
  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <Button
      {...rest}
      onClick={() => {
        if (!isLoggedIn) {
          toast.error('로그인이 필요합니다.');
        } else {
          showModal('NFT 전송하기', 'NFT 전송하기');
        }
      }}
    >
      NFT 전송하기
    </Button>
  );
};

export default NFTTransferButton;
