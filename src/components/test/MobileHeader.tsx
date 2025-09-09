import React from 'react';
import { Timer } from '../mobile/Timer';
import { ProgressBar } from '../mobile/ProgressBar';
import styles from '../../styles/modules/TestPage.module.scss';

interface MobileHeaderProps {
  onOpenLeaveModal: () => void;
  onOpenMobileMenu: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenLeaveModal,
  onOpenMobileMenu,
}) => {
  return (
    <div className={styles.mobileHeader}>
      <div className={styles.mobileTopRow}>
        <button className={styles.mobileBackButton} onClick={onOpenLeaveModal}>
          <img src="/dh/arrow-left.svg" alt="Back" />
        </button>
        <Timer />
        <button className={styles.mobileMenuButton} onClick={onOpenMobileMenu}>
          <span className={styles.threeDots}></span>
          <span className={styles.threeDots}></span>
          <span className={styles.threeDots}></span>
        </button>
      </div>
      <ProgressBar />
    </div>
  );
};
