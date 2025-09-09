import { useEffect, memo, ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../styles/modules/Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const getModalRoot = () => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) return modalRoot;
  return document.body;
};

export const Modal: FC<ModalProps> = memo(({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    getModalRoot(),
  );
});

Modal.displayName = 'Modal';
