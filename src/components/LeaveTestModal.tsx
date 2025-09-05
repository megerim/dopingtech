import { FC } from 'react';
import { Modal } from './common/Modal';
import styles from '../styles/modules/LeaveTestModal.module.scss';

interface LeaveTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LeaveTestModal: FC<LeaveTestModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.iconText}>!</span>
        </div>
        <h2 className={styles.title}>Ayrılmak istediğine emin misin?</h2>
        <p className={styles.subtitle}>
          Testi yarıda bırakıyorsun. İstediğin zaman kaldığın sorudan devam edebilirsin.
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
            Testten Çık
          </button>
        </div>
      </div>
    </Modal>
  );
};