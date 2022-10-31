import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';

import KlipAuth from '../Form/KlipAuthForm';

import NotificationForm from './NotificationForm';

export default function LoginRequestToast() {
  const { showModal } = useModalStore();

  const props = {
    title: '로그인 필요',
    description: (
      <>
        해당 기능을 이용하려면 로그인이 필요합니다. <br />
        로그인하시겠습니까?
      </>
    ),
    cancleButtonName: '취소',
    handleCancel: () => {
      toast.dismiss();
    },
    successButtonName: '로그인',
    handleSuccess: () => {
      showModal('로그인', <KlipAuth />);
      toast.dismiss();
    },
  };

  return <NotificationForm {...props} />;
}
