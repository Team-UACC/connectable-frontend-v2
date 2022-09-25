import Image from 'next/image';
import toast from 'react-hot-toast';

interface Props {
  copyTarget: string;
}

const CopyButton = ({ copyTarget }: Props) => {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyTarget);
        toast.success('클립보드에 복사되었습니다.');
      }}
    >
      <Image src="/icons/icon_copy__white_18.svg" alt="copy" width={18} height={18} />
    </button>
  );
};

export default CopyButton;
