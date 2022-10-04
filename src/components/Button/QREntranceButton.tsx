import toast from 'react-hot-toast';

import Button, { ButtonProps } from '~/components/Design/Button';
import QREntrance from '~/components/Tickets/Entrance/QREntrance';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

interface Props extends ButtonProps {
  ticketId: number;
  ticketName: string;
  eventLocation: string;
  eventDate: number;
}

const QREntranceButton = ({ ticketId, ticketName, eventLocation, eventDate, ...rest }: Props) => {
  const { showModal } = useModalStore();
  const { isLoggedIn } = useUserStore();
  return (
    <Button
      {...rest}
      onClick={() => {
        if (!isLoggedIn) {
          toast.error('로그인이 필요합니다.');
        } else {
          showModal(
            'QR 입장',
            <QREntrance
              ticketId={ticketId}
              eventDate={eventDate}
              eventLocation={eventLocation}
              ticketName={ticketName}
            />,
            'black'
          );
        }
      }}
    >
      QR 입장
    </Button>
  );
};

export default QREntranceButton;
