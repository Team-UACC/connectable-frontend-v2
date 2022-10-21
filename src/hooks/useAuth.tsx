import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { requestUserLogin } from '~/apis/users';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getKlipRequestKey } from '~/utils/klip';

import useFullScreenModal from './useFullScreenModal';

const AUTH_COOKIE_KEY = 'auth';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [refetchInterval, setRefetchInterval] = useState(0);
  const [requestKey, setRequestKey] = useState('');

  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();

  const { showSignUpModal, hideModal } = useFullScreenModal();

  useQuery(['login', { requestKey }], () => requestUserLogin(requestKey), {
    onSuccess: data => {
      if (data.status === 'completed') {
        setRefetchInterval(0);

        const { jwt, isNew, klaytnAddress } = data;

        setCookie(AUTH_COOKIE_KEY, jwt);

        if (isNew) {
          setKlaytnAddress(klaytnAddress as string);
          showSignUpModal();
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
  const router = useRouter();

  const logOut = () => {
    router.replace('/');
    deleteCookie(AUTH_COOKIE_KEY);
    setIsLoggedIn(false);
    toast.success('로그아웃 되었습니다.');
  };

  return logOut;
};
