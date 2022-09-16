import { ReactNode } from 'react';
import create from 'zustand';

interface BottomSheetModalState {
  isOpen: boolean;
  bottomSheetModalName: string;
  children: React.ReactNode;

  showBottomSheetModal: ({
    bottomSheetModalName,
    children,
  }: {
    bottomSheetModalName: string;
    children: React.ReactNode;
  }) => void;
  hideBottomSheetModal: () => void;
}

export const useBottomSheetModalStore = create<BottomSheetModalState>(set => ({
  isOpen: false,
  bottomSheetModalName: '',
  children: null,

  showBottomSheetModal: ({ bottomSheetModalName, children }) =>
    set(state => ({ ...state, isOpen: true, bottomSheetModalName, children })),
  hideBottomSheetModal: () => set(state => ({ ...state, isOpen: false })),
}));
