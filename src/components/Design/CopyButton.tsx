import Image from 'next/image';
import toast from 'react-hot-toast';

import CopyButtonSVG from '~/assets/svgs/CopyButtonSVG';

interface Props {
  copyTarget: string;
  color?: 'white' | 'pink';
  size?: number;
}

const CopyButton = ({ copyTarget, color = 'white', size = 18 }: Props) => {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyTarget);
        toast.success('클립보드에 복사되었습니다.');
      }}
    >
      <CopyButtonSVG color={color} size={size} />
    </button>
  );
};

export default CopyButton;
