import Image from 'next/image';
import { ReactNode } from 'react';

import Tooltip from '~/components/Tooltip';

interface Props {
  tx_hash?: string;
  account?: string;
  type: 'tx' | 'account';
  children: ReactNode;
}

export default function LinkToKlaytnScope({ tx_hash, account, children, type }: Props) {
  return (
    <Tooltip message="KlaytnScope에서 확인하기">
      <a
        href={`https://scope.klaytn.com/${type}/${type === 'tx' ? tx_hash : account}`}
        target="_blank"
        rel="noreferrer"
        className="w-full "
      >
        <div className="flex">
          <div className="flex flex-1 min-w-0 ">
            <div className="relative max-w-full overflow-hidden text-sm w-max text-brand-pink text-ellipsis whitespace-nowrap">
              {children}
            </div>
          </div>
          <button className="ml-2">
            <Image src={'/icons/icon_open_in_new_18.svg'} alt="open_new" width={18} height={18} />
          </button>
        </div>
      </a>
    </Tooltip>
  );
}
