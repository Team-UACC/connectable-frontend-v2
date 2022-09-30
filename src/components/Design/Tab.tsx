import { Children, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface Props {
  titles: Array<string>;
  children: ReactNode | Array<ReactNode>;
}

const Tab = ({ titles, children }: Props) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex flex-row flex-wrap px-4 list-none" role="tablist">
            {titles.map((title, idx) => (
              <TabNavButton key={title} openTab={openTab} setOpenTab={setOpenTab} idx={idx}>
                {title}
              </TabNavButton>
            ))}
          </ul>
          <div className="relative flex flex-col w-full ">
            <div className="flex-auto">
              <div>
                {Children.toArray(children).map((child, idx) => (
                  <div className={openTab === idx ? 'block' : 'hidden'} key={idx} id={`link${idx}`}>
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type TabNavButtonProps = {
  openTab: number;
  setOpenTab: Dispatch<SetStateAction<number>>;
  children: string;
  idx: number;
};

const TabNavButton = ({ openTab, setOpenTab, children, idx }: TabNavButtonProps) => {
  return (
    <li className="flex-auto text-center">
      <a
        className={[
          'block py-4 font-bold border-b-2',
          openTab === idx ? 'border-black text-black' : 'text-gray5 border-nones',
        ].join(' ')}
        onClick={e => {
          e.preventDefault();
          setOpenTab(idx);
        }}
        data-toggle="tab"
        href={`#link${idx}`}
        role="tablist"
      >
        <span>{children}</span>
      </a>
    </li>
  );
};

export default Tab;
