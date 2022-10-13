import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  bgTopGradient?: boolean;
}

const FooterWrapper = ({ children, bgTopGradient = false }: Props) => {
  return (
    <footer className={`fixed w-full max-w-layout bottom-0 z-10`}>
      {bgTopGradient && <div className="w-full h-[34px] bg-gradient-to-t from-white to-transparent" />}
      {children}
    </footer>
  );
};

export default FooterWrapper;
