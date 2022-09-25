import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { useModalStore } from '~/stores/modal';
import { isShallowModalUrl } from '~/utils/index';

import NavHeader from './Design/NavHeader';

export default function FullScreenModal() {
  const { isOpen, modalName, children, setIsOpen, setModalContent, theme } = useModalStore();

  const themeColor = theme === 'white' ? 'bg-white text-black' : 'bg-black text-white';

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
          <div className={['fixed inset-0 m-auto overflow-y-auto transition-opacity'].join(' ')}>
            <div
              className={[
                'fixed w-[min(100vw,428px)] inset-0 z-10 flex items-end justify-center min-h-full m-auto text-center',
                themeColor,
              ].join(' ')}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative flex flex-col w-full h-screen">
                  <NavHeader
                    type={theme === 'white' ? 'close-white' : 'close-black'}
                    handleClickClose={() => {
                      const storage = globalThis?.sessionStorage;
                      const current = storage.getItem('currentPath') || '/';

                      if (isShallowModalUrl(current)) {
                        window.history.back();
                        window.history.replaceState(window.history.state, '', window.location.pathname);
                      }

                      setIsOpen(false);
                      setModalContent(null, null);
                    }}
                  >
                    {modalName}
                  </NavHeader>

                  <div className="my-auto max-h-[80vh] px-4 overflow-y-scroll">{children}</div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
