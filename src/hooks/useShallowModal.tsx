import { useRouter } from 'next/router';

const useShallowModal = () => {
  const router = useRouter();
  return { pushShallowUrl: () => router.push('?stack_modal=true', undefined, { shallow: true }) };
};

export default useShallowModal;
