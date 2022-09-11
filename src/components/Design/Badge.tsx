import { useMemo } from 'react';

interface Props {
  name: string;
  size?: 'lg' | 'sm';
  color?: 'black' | 'white';
  opacity?: boolean;
}

const Badge = ({ name, size = 'sm', color = 'black', opacity = false }: Props) => {
  const commonClassName = useMemo(() => `border-[1px] rounded-[20px] w-max font-bold`, []);
  const sizeClassName = useMemo(
    () => (size === 'lg' ? `text-sm px-[12px] py-[6px]` : 'text-xs px-[5px] py-[2px]'),
    [size]
  );
  const colorClassName = useMemo(
    () => (color === 'black' ? `border-gray1 text-gray2` : `border-white text-white`),
    [color]
  );
  const opacityClassName = useMemo(() => (opacity ? 'opacity-40' : ''), [opacity]);

  return <div className={[commonClassName, sizeClassName, colorClassName, opacityClassName].join(' ')}>{name}</div>;
};

export default Badge;
