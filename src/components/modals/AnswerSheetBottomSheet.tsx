import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../styles/modules/AnswerSheetBottomSheet.module.scss';
import { Optic } from '../optic/Optic';
import { useAppSelector } from '../../store/hooks';
import { useOpticScroll } from '../../hooks/useOpticScroll';

interface AnswerSheetBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnswerSheetBottomSheet: React.FC<AnswerSheetBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentQuestionIndex } = useAppSelector((s) => s.test);
  const opticScrollAreaRef = useOpticScroll(currentQuestionIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.handleBarWrapper} aria-hidden="true">
          <div className={styles.handleBar} />
        </div>
        <div className={styles.opticWrapper}>
          <Optic ref={opticScrollAreaRef} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
