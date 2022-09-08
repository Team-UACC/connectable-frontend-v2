import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type NavHeaderType = 'sub-transparent' | 'sub-white' | 'close-black' | 'close-white' | 'home';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  type?: NavHeaderType;
  hasNotificaiton?: boolean;
}

const NavHeader = (props: Props) => {
  const { type = 'home', hasNotificaiton = false, children, ...rest } = props;

  if (type === 'sub-transparent') {
    return (
      <nav className="relative w-full h-[60px] flex  items-center bg-transparent " {...rest}>
        <Image src={`/icons/icon_arrow_back_circle_white.svg`} alt="back" width={36} height={36} className="ml-4" />
      </nav>
    );
  }

  if (type === 'sub-white') {
    return (
      <nav className="relative w-full h-[60px] flex items-center bg-white " {...rest}>
        <Image src={`/icons/icon_arrow_back_black_24.svg`} alt="back" width={24} height={24} className="ml-4" />
        <span className="absolute text-lg font-bold -translate-x-1/2 left-1/2">{children}</span>
      </nav>
    );
  }

  if (type === 'close-white') {
    return (
      <nav className="relative w-full h-[60px] flex items-center bg-white " {...rest}>
        <Image src={`/icons/icon_nav_black_close_32.svg`} alt="back" width={24} height={24} className="ml-4" />
        <span className="absolute text-lg font-bold -translate-x-1/2 left-1/2">{children}</span>
      </nav>
    );
  }

  if (type === 'close-black') {
    return (
      <nav className="relative w-full h-[60px] flex items-center bg-black text-white " {...rest}>
        <Image src={`/icons/icon_nav_white_close_32.svg`} alt="back" width={24} height={24} className="ml-4" />
        <span className="absolute text-lg font-bold -translate-x-1/2 left-1/2">{children}</span>
      </nav>
    );
  }

  return (
    <nav className="relative w-full h-[60px] flex justify-between items-center text-white bg-black pl-2 pr-4" {...rest}>
      <Image src={`/icons/Connectable_sg2_w.png`} alt="logo" width={171} height={36} />
      <div className="flex gap-4">
        <div className="relative w-6 h-6 ">
          {hasNotificaiton && <div className="absolute w-[6px] h-[6px] bg-brand-pink top-0 right-0 rounded-full"></div>}
          <div className="ml-[4px] mt-[2px]">
            <Image src={`/icons/notifications.svg`} alt="noti" width={16} height={20} />
          </div>
        </div>
        <Image src={`/icons/menu.svg`} alt="menu" width={24} height={24} />
      </div>
    </nav>
  );
};

export default NavHeader;
