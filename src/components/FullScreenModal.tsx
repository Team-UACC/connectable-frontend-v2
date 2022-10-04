import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';

import { useModalStore } from '~/stores/modal';
import { isShallowModalUrl } from '~/utils/index';

import NavHeader from './Design/NavHeader';

export default function FullScreenModal() {
  const { isOpen, modalName, children, setIsOpen, setModalContent, theme } = useModalStore();

  const themeColor = theme === 'white' ? 'text-black' : 'bg-black text-white';

  const { containerRef } = useScrollToTop();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={['fixed m-auto inset-0 transition-opacity bg-white bg-opacity-[95%] backdrop-blur-[6px]'].join(
              ' '
            )}
          />
        </Transition.Child>

        <div
          className={['fixed w-[min(100vw,428px)] inset-0 z-[999] flex justify-center m-auto', themeColor].join(' ')}
        >
          <div className="relative flex flex-col justify-center w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative flex flex-col-reverse w-full min-h-full">
                <div ref={containerRef} className="relative h-[calc(100vh-60px)]  overflow-y-auto">
                  {children}
                </div>
                <NavHeader
                  className={['bg-inherit'].join(' ')}
                  type={theme === 'white' ? 'close-white' : 'close-black'}
                  handleClickClose={() => {
                    const storage = globalThis?.sessionStorage;
                    const current = storage.getItem('currentPath') || '/';

                    if (isShallowModalUrl(current)) {
                      window.history.back();
                      window.history.replaceState(window.history.state, '', window.location.pathname);
                    }

                    setIsOpen(false);
                    setTimeout(() => setModalContent(null, null, 'white'), 500);
                  }}
                >
                  {modalName}
                </NavHeader>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const useScrollToTop = () => {
  const { isOpen } = useModalStore();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      containerRef.current?.scrollTo(0, 0);
      console.log(containerRef.current?.scrollTop, isOpen);
    });
  }, [isOpen]);

  return { containerRef };
};
