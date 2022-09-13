import { ReactNode } from 'react';

import NavFooter, { FooterTabType } from './Design/NavFooter';
import NavHeader, { NavHeaderType } from './Design/NavHeader';

interface Props {
  children: ReactNode;
  selectedFooter: FooterTabType | null;
  headerType: NavHeaderType;
}

export default function Layout({ children, selectedFooter, headerType }: Props) {
  return (
    <div className="relative max-w-[428px] min-h-screen m-auto w-full pt-[60px] pb-[66px]">
      <header className="fixed top-0 z-10 max-w-[428px] w-full">
        <NavHeader type={headerType} logoLink="/" />
      </header>
      <div className="min-h-[calc(100vh-126px)] ">{children}</div>
      {selectedFooter && (
        <footer className="fixed w-full max-w-[428px] bottom-0 z-50">
          <NavFooter selected={selectedFooter} />
        </footer>
      )}
    </div>
  );
}
