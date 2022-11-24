import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

const SkeletonBox = ({ width, height, className, style, ...rest }: Props) => {
  return (
    <div
      className={[`animate-pulse bg-gray6 rounded-lg`, className].join(' ')}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
};

export default SkeletonBox;
