import { ReactNode } from 'react';

import useShallowModal from '~/hooks/useShallowModal';
import { useModalStore } from '~/stores/modal';

import BottomSheet from './Design/BottomSheet';
import NavFooter, { FooterTabType } from './Design/NavFooter';
import NavHeader, { NavHeaderType } from './Design/NavHeader';
import MoreMenu from './Form/MoreMenuForm';

interface Props {
  children: ReactNode;
  selectedFooter: FooterTabType | null;
  headerType: NavHeaderType;
  headerName?: string;
}

export default function Layout({ children, selectedFooter, headerType, headerName }: Props) {
  const { showModal } = useModalStore();

  const { pushShallowUrl } = useShallowModal();

  const paddingClassName = [
    headerType === 'sub-transparent' ? '' : 'pt-[60px]',
    selectedFooter === null ? '' : 'pb-[66px]',
  ].join(' ');

  const navPaddingSize = (headerType !== 'sub-transparent' ? 60 : 0) + (selectedFooter !== null ? 66 : 0);

  return (
    <div className={[`relative max-w-layout min-h-screen m-auto w-full`, paddingClassName].join(' ')}>
      <header className={`fixed top-0 z-50 max-w-layout w-full`}>
        <NavHeader
          type={headerType}
          logoLink="/"
          handleClickMoreMenu={() => {
            pushShallowUrl();
            showModal('메뉴', <MoreMenu />);
          }}
        >
          {headerName}
        </NavHeader>
      </header>
      <div className={`min-h-[calc(100vh-${navPaddingSize}px)]`}>{children}</div>
      {selectedFooter && (
        <footer className={`fixed w-full max-w-layout bottom-0 z-10`}>
          <NavFooter selected={selectedFooter} />
        </footer>
      )}
      <BottomSheet />
    </div>
  );
}
