import { useEffect } from 'react';
import { Layout } from './layout/Layout';
import { QuestionCard } from './question/QuestionCard';
import { Optic } from './optic/Optic';
import styles from '../styles/modules/TestPage.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTestStart, goToNextQuestion, goToPreviousQuestion, finishTest, toggleShowAnswers } from '../store/slices/testSlice';

export const TestPage = () => {
  const dispatch = useAppDispatch();
  const { isFinished, showAnswers } = useAppSelector((s) => s.test);

  useEffect(() => {
    dispatch(loadTestStart());
  }, [dispatch]);
  return (
    <Layout>
      <div className={styles.testPageContainer}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.backButton}>
              <img src="/dh/arrow-left.svg" alt="Back" />
            </button>
            <h1 className={styles.pageTitle}>Konu Tarama Testi #1</h1>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.toggleContainer}>
              <span>Cevapları Göster</span>
              <button
                className={`${styles.switch} ${showAnswers ? styles['switch--on'] : ''}`}
                onClick={() => dispatch(toggleShowAnswers())}
                disabled={!isFinished}
                aria-pressed={showAnswers}
                aria-label="Cevapları Göster"
                title={!isFinished ? 'Testi bitirdikten sonra kullanılabilir' : 'Cevapları göster'}
              >
                <span className={styles.switch__slider} />
              </button>
            </div>
            <button className={styles.endTestButton} onClick={() => dispatch(finishTest())}>
              <div className={styles.endTestButton__icon}>
                <img src="/dh/shutdown.png" alt="End Test" />
              </div>
              <span>{isFinished ? 'Test Tamamlandı' : 'Testi Bitir'}</span>
            </button>
          </div>
        </header>

        <div className={styles.sectionsWrapper}>
          <div className={styles.questionArea}>
            <QuestionCard />
            <div className={styles.navigationButtons}>
              <button className={styles.navButton} disabled={isFinished} onClick={() => dispatch(goToPreviousQuestion())}>
                <img src="/dh/chevron-left.svg" alt="Previous" />
                <span>Önceki Soru</span>
              </button>
              <button className={styles.navButton} disabled={isFinished} onClick={() => dispatch(goToNextQuestion())}>
                <span>Sonraki Soru</span>
                <img src="/dh/chevron-right.svg" alt="Next" />
              </button>
            </div>
          </div>
          <div className={styles.opticArea}>
            <Optic />
          </div>
        </div>
      </div>
    </Layout>
  );
};