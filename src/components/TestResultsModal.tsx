import { FC } from 'react';
import { Modal } from './common/Modal';
import styles from '../styles/modules/TestResultsModal.module.scss';

interface TestStats {
  correct: number;
  wrong: number;
  empty: number;
  net: number;
}

interface TestResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: TestStats;
}

export const TestResultsModal: FC<TestResultsModalProps> = ({ 
  isOpen, 
  onClose, 
  stats
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.iconText}>✓</span>
        </div>
        <h2 className={styles.title}>Test Tamamlandı!</h2>
        
        <p className={styles.subtitle}>
          Test sonuçlarınız aşağıda gösterilmektedir.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Net</span>
            <span className={`${styles.statValue} ${styles.net}`}>{stats.net}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Doğru</span>
            <span className={`${styles.statValue} ${styles.correct}`}>{stats.correct}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Yanlış</span>
            <span className={`${styles.statValue} ${styles.wrong}`}>{stats.wrong}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Boş</span>
            <span className={`${styles.statValue} ${styles.empty}`}>{stats.empty}</span>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`} 
            onClick={onClose}
            type="button"
          >
            Tamam
          </button>
        </div>
      </div>
    </Modal>
  );
};