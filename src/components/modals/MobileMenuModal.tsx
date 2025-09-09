import { createPortal } from 'react-dom';
import { memo } from 'react';
import styles from '../../styles/modules/MobileMenuModal.module.scss';

interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishTest: () => void;
  onShowAnswerSheet: () => void;
}

const Modal: React.FC<MobileMenuModalProps> = ({
  isOpen,
  onClose,
  onFinishTest,
  onShowAnswerSheet,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className={styles.menuContent}>
          <button
            className={styles.menuItem}
            onClick={() => {
              onFinishTest();
              onClose();
            }}
          >
            <span>Testi Bitir</span>
          </button>
          <button
            className={styles.menuItem}
            onClick={() => {
              onShowAnswerSheet();
              onClose();
            }}
          >
            <span>Cevap Anahtarı</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export const MobileMenuModal = memo(Modal);
