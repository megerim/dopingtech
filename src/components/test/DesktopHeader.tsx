import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleShowAnswers } from '../../store/slices/testSlice';
import styles from '../../styles/modules/TestPage.module.scss';

interface DesktopHeaderProps {
  onOpenLeaveModal: () => void;
  onOpenFinishModal: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  onOpenLeaveModal,
  onOpenFinishModal,
}) => {
  const dispatch = useAppDispatch();
  const { isFinished, showAnswers } = useAppSelector((s) => s.test);

  return (
    <div className={styles.desktopHeader}>
      <div className={styles.headerLeft}>
        <button className={styles.backButton} onClick={onOpenLeaveModal}>
          <img src="/dh/arrow-left.svg" alt="Back" />
        </button>
        <h1 className={styles.pageTitle}>Konu Tarama Testi #1</h1>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.toggleContainer}>
          <span>Cevapları Göster</span>
          <button
            className={`${styles.switch} ${
              showAnswers ? styles['switch--on'] : ''
            }`}
            onClick={() => dispatch(toggleShowAnswers())}
            disabled={!isFinished}
            aria-pressed={showAnswers}
            aria-label="Cevapları Göster"
            title={
              !isFinished
                ? 'Testi bitirdikten sonra kullanılabilir'
                : 'Cevapları göster'
            }
          >
            <span className={styles.switch__slider} />
          </button>
        </div>
        <button
          className={styles.endTestButton}
          onClick={() => (isFinished ? null : onOpenFinishModal())}
        >
          <div className={styles.endTestButton__icon}>
            <img src="/dh/shutdown.png" alt="End Test" />
          </div>
          <span>{isFinished ? 'Test Tamamlandı' : 'Testi Bitir'}</span>
        </button>
      </div>
    </div>
  );
};
