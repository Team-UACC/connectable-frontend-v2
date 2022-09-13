import Image from 'next/image';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type FooterTabType = 'events' | 'artists' | 'my';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  selected: FooterTabType;
}

const NavFooter = (props: Props) => {
  const { selected, ...rest } = props;
  const tabNameList: Array<FooterTabType> = ['events', 'artists', 'my'];

  return (
    <nav className="relative w-full h-[66px] flex justify-around items-center bg-gray6 " {...rest}>
      {tabNameList.map(name => (
        <Link href={name === 'events' ? '/' : `/${name}`} key={name}>
          <a className="w-1/3 h-full">
            <TabItem name={name} selected={name === selected} />
          </a>
        </Link>
      ))}
    </nav>
  );
};

const TAB_TYPE_NAME: { [type in FooterTabType]: string } = {
  events: '이벤트',
  artists: '아티스트',
  my: '마이',
};

const TabItem = ({ name, selected }: { name: FooterTabType; selected: boolean }) => (
  <div className="flex flex-col items-center cursor-pointer w-100px py-[13px]">
    <Image src={`/icons/icon_tab_${name}_${selected ? 'pink' : 'white'}_24.svg`} alt={name} width={24} height={24} />
    <span className={'text-xs' + ' ' + (selected ? 'text-brand-pink font-bold' : 'text-gray2')}>
      {TAB_TYPE_NAME[name]}
    </span>
  </div>
);
export default NavFooter;
