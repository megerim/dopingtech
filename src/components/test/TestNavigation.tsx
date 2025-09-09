import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  goToPreviousQuestion,
  goToNextQuestion,
} from '../../store/slices/testSlice';
import styles from '../../styles/modules/TestPage.module.scss';

export const TestNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isFinished } = useAppSelector((s) => s.test);

  return (
    <div className={styles.navigationButtons}>
      <button
        className={styles.navButton}
        disabled={isFinished}
        onClick={() => dispatch(goToPreviousQuestion())}
      >
        <img src="/dh/chevron-left.svg" alt="Previous" />
        <span>Önceki Soru</span>
      </button>
      <button
        className={styles.navButton}
        disabled={isFinished}
        onClick={() => dispatch(goToNextQuestion())}
      >
        <span>Sonraki Soru</span>
        <img src="/dh/chevron-right.svg" alt="Next" />
      </button>
    </div>
  );
};
