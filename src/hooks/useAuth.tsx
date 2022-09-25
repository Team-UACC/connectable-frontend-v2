import { deleteCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { requestUserLogin } from '~/apis/users';
// import SignUpForm from '~/components/Form/SignUpForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getKlipRequestKey } from '~/utils/klip';

const AUTH_COOKIE_KEY = 'auth';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [refetchInterval, setRefetchInterval] = useState(0);
  const [requestKey, setRequestKey] = useState('');

  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();

  useQuery(['login', { requestKey }], () => requestUserLogin(requestKey), {
    onSuccess: data => {
      if (data.status === 'completed') {
        setRefetchInterval(0);

        const { jwt, isNew, klaytnAddress } = data;

        setCookie(AUTH_COOKIE_KEY, jwt);

        if (isNew) {
          setKlaytnAddress(klaytnAddress as string);
          showModal('회원가입', <div>SignUp</div>);
        } else {
          setIsLoggedIn(true);
          toast.success('로그인되었습니다.');
          hideModal();
        }
      }
    },
    refetchInterval,
    enabled: refetchInterval > 0,
  });

  useEffect(() => {
    (async () => {
      const fetchedRequestKey = await getKlipRequestKey();
      setRequestKey(fetchedRequestKey);

      getKlipRequest(fetchedRequestKey, method, setQrvalue);

      setRefetchInterval(1000);
    })();
  }, [method]);

  return [method, qrvalue];
};

export const useLogout = () => {
  const { setIsLoggedIn } = useUserStore();
  const logOut = () => {
    deleteCookie(AUTH_COOKIE_KEY);
    setIsLoggedIn(false);
    toast.success('로그아웃 되었습니다.');
  };

  return logOut;
};
