import { useRouter } from 'next/router';

const useShallowModal = () => {
  const router = useRouter();
  return {
    pushShallowUrl: (pathname = '') => router.push(pathname + '?stack_modal=true', undefined, { shallow: true }),
  };
};

export default useShallowModal;
