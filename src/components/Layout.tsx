import { ReactNode } from 'react';

import { LAYOUT_MAX_WIDTH } from '~/constants/style';

import BottomSheet from './Design/BottomSheet';
import NavFooter, { FooterTabType } from './Design/NavFooter';
import NavHeader, { NavHeaderType } from './Design/NavHeader';

interface Props {
  children: ReactNode;
  selectedFooter: FooterTabType | null;
  headerType: NavHeaderType;
}

export default function Layout({ children, selectedFooter, headerType }: Props) {
  const paddingClassName = [
    headerType === 'sub-transparent' ? '' : 'pt-[60px]',
    selectedFooter === null ? '' : 'pb-[66px]',
  ].join(' ');

  const navPaddingSize = (headerType !== 'sub-transparent' ? 60 : 0) + (selectedFooter !== null ? 66 : 0);

  return (
    <div className={[`relative max-w-[${LAYOUT_MAX_WIDTH}px] min-h-screen m-auto w-full`, paddingClassName].join(' ')}>
      <header className={`fixed top-0 z-50 max-w-[${LAYOUT_MAX_WIDTH}px] w-full`}>
        <NavHeader type={headerType} logoLink="/" />
      </header>
      <div className={`min-h-[calc(100vh-${navPaddingSize}px)]`}>{children}</div>
      {selectedFooter && (
        <footer className={`fixed w-full max-w-[${LAYOUT_MAX_WIDTH}px] bottom-0 z-10`}>
          <NavFooter selected={selectedFooter} />
        </footer>
      )}
      <BottomSheet />
    </div>
  );
}
