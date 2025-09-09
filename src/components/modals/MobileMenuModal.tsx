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
      <div className={styles.sheet} role="dialog" aria-modal="true">
        <div className={styles.sheetGroup}>
          <button
            className={`${styles.sheetItem} ${styles.answerKey}`}
            onClick={() => {
              onShowAnswerSheet();
              onClose();
            }}
            type="button"
          >
            Cevap Anahtarı
          </button>
          <div className={styles.divider} />
          <button
            className={`${styles.sheetItem} ${styles.finishTest}`}
            onClick={() => {
              onFinishTest();
            }}
            type="button"
          >
            Testi Bitir
          </button>
        </div>
        <button
          className={`${styles.sheetItem} ${styles.cancel}`}
          onClick={onClose}
          type="button"
        >
          Vazgeç
        </button>
      </div>
    </div>,
    document.body,
  );
};

export const MobileMenuModal = memo(Modal);
