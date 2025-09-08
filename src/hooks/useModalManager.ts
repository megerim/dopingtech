import { useState, useCallback } from 'react';

export type ModalType = 'leave' | 'finish' | 'results' | 'mobileMenu' | null;

export const useModalManager = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return {
    activeModal,
    openModal,
    closeModal,
  };
};