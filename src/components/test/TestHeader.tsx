import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import styles from '../../styles/modules/TestPage.module.scss';

interface TestHeaderProps {
  onOpenLeaveModal: () => void;
  onOpenFinishModal: () => void;
  onOpenMobileMenu: () => void;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  onOpenLeaveModal,
  onOpenFinishModal,
  onOpenMobileMenu,
}) => {
  const { isMobile } = useTheme();

  return (
    <header className={styles.header}>
      {isMobile ? (
        <MobileHeader
          onOpenLeaveModal={onOpenLeaveModal}
          onOpenMobileMenu={onOpenMobileMenu}
        />
      ) : (
        <DesktopHeader
          onOpenLeaveModal={onOpenLeaveModal}
          onOpenFinishModal={onOpenFinishModal}
        />
      )}
    </header>
  );
};
