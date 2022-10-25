import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  bgTopGradient?: boolean;
  position?: 'fixed' | 'relative';
}

const FooterWrapper = ({ children, bgTopGradient = false, position = 'fixed' }: Props) => {
  return (
    <footer className={`${position} w-full max-w-layout bottom-0 z-10`}>
      {bgTopGradient && <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />}
      {children}
    </footer>
  );
};

export default FooterWrapper;
