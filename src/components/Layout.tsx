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
    <div className="relative max-w-[428px] min-h-screen m-auto w-full">
      <header className="sticky top-0 z-10">
        <NavHeader type={headerType} />
      </header>
      <div>{children}</div>
      {selectedFooter && (
        <footer className="sticky w-full max-w-[428px] bottom-0 mt-8 z-50">
          <NavFooter selected={selectedFooter} />
        </footer>
      )}
    </div>
  );
}
