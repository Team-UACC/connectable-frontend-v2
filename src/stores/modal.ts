import { ReactNode } from 'react';
import create from 'zustand';

interface ModalState {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  modalName: ReactNode | null;
  theme: 'white' | 'black';
  children: React.ReactNode;
  setModalContent: (modalName: ReactNode | null, children: React.ReactNode, theme?: 'white' | 'black') => void;
  showModal: (modalName: ReactNode | null, children: React.ReactNode, theme?: 'white' | 'black') => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  theme: 'white',
  setIsOpen: (_isOpen: boolean) => set(state => ({ ...state, isOpen: _isOpen })),
  modalName: null,
  children: null,
  setModalContent: (_modalName, _children, _theme = 'white') =>
    set(state => ({ ...state, modalName: _modalName, children: _children, theme: _theme })),

  showModal: (_modalName, _children, _theme = 'white') =>
    set(state => ({ ...state, isOpen: true, modalName: _modalName, children: _children, theme: _theme })),
  hideModal: () => set(state => ({ ...state, isOpen: false, modalName: null, children: null })),
}));
