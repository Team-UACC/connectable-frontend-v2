/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import KlipAuth from '~/components/Form/KlipAuthForm';
import OrderForm from '~/components/Form/OrderForm';
import ProfileEditForm from '~/components/Form/ProfileEditForm';
import MoreMenu from '~/components/MoreMenu';
import { useModalStore } from '~/stores/modal';

const useFullScreenModal = () => {
  const { showModal, hideModal } = useModalStore();

  const showMoreMenuModal = useCallback(() => {
    showModal('메뉴', <MoreMenu />);
  }, []);

  const showLoginModal = useCallback(() => {
    showModal('로그인', <KlipAuth />);
  }, []);

  const showSignUpModal = useCallback(() => {
    showModal('회원가입', <div>SignUp</div>);
  }, []);

  const showOrderModal = useCallback(
    ({ amount, ticketIdList, eventId }: { amount: number; ticketIdList: Array<number>; eventId: number }) => {
      showModal('결제하기', <OrderForm amount={amount} ticketIdList={ticketIdList} eventId={eventId} />);
    },
    []
  );

  const showProfileEditModal = useCallback(({ userName, phoneNumber }: { userName: string; phoneNumber: string }) => {
    showModal('프로필 수정', <ProfileEditForm userName={userName} phoneNumber={phoneNumber} />);
  }, []);

  return { showMoreMenuModal, showLoginModal, showSignUpModal, showOrderModal, showProfileEditModal, hideModal };
};

export default useFullScreenModal;
