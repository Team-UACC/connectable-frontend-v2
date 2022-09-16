import { useEffect } from 'react';

import { useBottomSheet } from '~/hooks/useBottomSheet';
import { useBottomSheetModalStore } from '~/stores/bottomSheetModal';

const BottomSheet = () => {
  const { sheetRef, setOpen, setClose } = useBottomSheet();

  const { isOpen, children, bottomSheetModalName, hideBottomSheetModal } = useBottomSheetModalStore();

  useEffect(() => {
    if (isOpen) {
      setOpen();
    } else {
      setClose();
    }
  }, [isOpen, setClose, setOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={`absolute top-0 bg-black bg-opacity-30 h-full z-[999] w-full max-w-layout m-auto`}
          onClick={() => {
            hideBottomSheetModal();
          }}
        />
      )}
      <div
        ref={sheetRef}
        className={`flex flex-col fixed w-full max-w-layout m-auto z-[999] bottom-0 left-0 right-0 rounded-t-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)] ease-in-out duration-500 translate-y-[110%]`}
      >
        <BottomSheetHeader name={bottomSheetModalName} />
        <div>{children}</div>
      </div>
    </>
  );
};

const BottomSheetHeader = ({ name }: { name: string }) => {
  return (
    <div className="relative z-50 w-full h-12 pt-4 pb-1 rounded-t-l ">
      <div className="m-auto text-lg font-bold w-max">{name}</div>
    </div>
  );
};

export default BottomSheet;
