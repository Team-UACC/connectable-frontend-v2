import { useCallback, useEffect } from 'react';

import { fetchUser } from '~/apis/users';
import { useUserStore } from '~/stores/user';

export default function useUserStatus() {
  const { isLoggedIn, setIsLoggedIn, addUserState, resetUserState } = useUserStore();

  const initializeUser = useCallback(async () => {
    const response = await fetchUser();

    if (response.status === 'success') {
      const { nickname, klaytnAddress, phoneNumber } = response;
      addUserState(nickname as string, klaytnAddress as string, phoneNumber as string);
      setIsLoggedIn(true);
    } else {
      resetUserState();
      setIsLoggedIn(false);
    }
  }, [addUserState, resetUserState, setIsLoggedIn]);

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
}
