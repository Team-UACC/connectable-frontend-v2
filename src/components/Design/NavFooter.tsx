import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import Artists from '../Footer/Tab/Artists';
import Events from '../Footer/Tab/Events';
import My from '../Footer/Tab/My';

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
    {name === 'my' && <My isSelected={selected} />} {name === 'events' && <Events isSelected={selected} />}
    {name === 'artists' && <Artists isSelected={selected} />}
    <span className={'text-xs' + ' ' + (selected ? 'text-brand-pink font-bold' : 'text-gray2')}>
      {TAB_TYPE_NAME[name]}
    </span>
  </div>
);
export default NavFooter;
