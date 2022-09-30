import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {}

const BodyText = (props: Props) => {
  const { children, className } = props;
  return <span className={[className, 'font-normal text-base'].join(' ')}>{children}</span>;
};

export default BodyText;
