import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button, { ButtonProps } from '../Design/Button';
import NFTTransferForm from '../Form/NFTTransferForm';
import LoginRequestToast from '../Toast/LoginRequestToast';

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
          toast(<LoginRequestToast />);
        } else {
          showModal(
            'NFT 전송하기',
            <NFTTransferForm blockchain={blockchain} eventId={Number(eventId)} ticketId={Number(ticketId)} />
          );
        }
      }}
    >
      NFT 전송하기
    </Button>
  );
};

export default NFTTransferButton;
