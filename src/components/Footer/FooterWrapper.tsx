import { ReactNode } from 'react';

const FooterWrapper = ({ children }: { children: ReactNode }) => {
  return <footer className={`fixed w-full max-w-layout bottom-0 z-10`}>{children}</footer>;
};

export default FooterWrapper;
