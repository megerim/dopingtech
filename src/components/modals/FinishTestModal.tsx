import { FC } from 'react';
import { Modal } from './Modal';
import styles from '../../styles/modules/FinishTestModal.module.scss';

interface FinishTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  emptyCount: number;
}

export const FinishTestModal: FC<FinishTestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  emptyCount,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.iconText}>!</span>
        </div>
        <h2 className={styles.title}>
          Testi Bitirmek İstediğinize Emin Misiniz?
        </h2>

        <p className={styles.subtitle}>
          {emptyCount > 0
            ? `${emptyCount} adet boş sorunuz var, testi bitirmek istediğinize emin misiniz?`
            : 'Testi bitirmek istediğinize emin misiniz?'}
        </p>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
            type="button"
          >
            Vazgeç
          </button>
          <button
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={onConfirm}
            type="button"
          >
            Testi Bitir
          </button>
        </div>
      </div>
    </Modal>
  );
};
