import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type TabType = 'events' | 'artists' | 'my';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  selected: TabType;
}

const NavFooter = (props: Props) => {
  const { selected, ...rest } = props;
  const tabNameList: Array<TabType> = ['events', 'artists', 'my'];

  return (
    <nav className="relative w-full h-[66x] flex justify-around items-center bg-white " {...rest}>
      {tabNameList.map(name => (
        <TabItem name={name} selected={name === selected} key={name} />
      ))}
    </nav>
  );
};

const TAB_TYPE_NAME: { [type in TabType]: string } = {
  events: '이벤트',
  artists: '아티스트',
  my: '마이',
};

const TabItem = ({ name, selected }: { name: TabType; selected: boolean }) => (
  <div className="flex flex-col items-center w-100px">
    <Image src={`/icons/icon_tab_${name}_${selected ? 'pink' : 'white'}_24.svg`} alt={name} width={24} height={24} />
    <span className={'text-xs' + ' ' + (selected ? 'text-brand-pink font-bold' : 'text-gray2')}>
      {TAB_TYPE_NAME[name]}
    </span>
  </div>
);
export default NavFooter;
