import { ReactNode } from 'react';

interface Props {
  color?: 'pink' | 'gray';
  children: ReactNode;
}

const SpeeachBubble = (props: Props) => {
  const { color = 'pink', children } = props;
  const colorClassName = color === 'pink' ? 'bg-[#FE52B0]' : 'bg-[#8B8B8B]';

  return (
    <div className="relative flex flex-col items-start w-max">
      <div
        className={['relative p-2 text-xs leading-none text-white whitespace-no-wrap shadow-lg', colorClassName].join(
          ' '
        )}
      >
        {children}
      </div>
      <div className={['w-3 h-3 -mt-2 rotate-45 ml-2', colorClassName].join(' ')}></div>
    </div>
  );
};

export default SpeeachBubble;
