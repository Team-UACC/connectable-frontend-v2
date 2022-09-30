import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const usePathStore = () => {
  const router = useRouter();

  const storePathValues = useCallback(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath as string);
    storage.setItem('currentPath', globalThis.location.pathname + globalThis.location.search);
  }, []);

  useEffect(() => storePathValues, [router.asPath, storePathValues]);
};

export default usePathStore;
