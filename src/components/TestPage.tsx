import { useEffect, useState, useCallback } from 'react';
import { Layout } from './layout/Layout';
import { QuestionCard } from './question/QuestionCard';
import { Optic } from './optic/Optic';
import { Timer } from './mobile/Timer';
import { ProgressBar } from './mobile/ProgressBar';
import { MobileMenuModal } from './modals/MobileMenuModal';
import { ThemeProvider } from '../contexts/ThemeContext';
import styles from '../styles/modules/TestPage.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTestStart, goToNextQuestion, goToPreviousQuestion, finishTest, toggleShowAnswers, selectTestStats } from '../store/slices/testSlice';
import { LeaveTestModal } from './modals/LeaveTestModal';
import { FinishTestModal } from './modals/FinishTestModal';
import { TestResultsModal } from './modals/TestResultsModal';

export const TestPage = () => {
  const dispatch = useAppDispatch();
  const { isFinished, showAnswers } = useAppSelector((s) => s.test);
  const stats = useAppSelector(selectTestStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(loadTestStart());
  }, [dispatch]);

  const handleConfirmLeave = useCallback(() => {
    dispatch(finishTest());
    setIsModalOpen(false);
  }, [dispatch]);

  const handleConfirmFinish = useCallback(() => {
    console.log('Test Statistics:', {
      net: stats.net,
      correct: stats.correct,
      wrong: stats.wrong,
      empty: stats.empty
    });
    dispatch(finishTest());
    setIsFinishModalOpen(false);
    setIsResultsModalOpen(true);
  }, [dispatch, stats]);

  return (
    <ThemeProvider>
      <Layout>
        <div className={styles.testPageContainer}>
        <header className={styles.header}>
          <div className={styles.desktopHeader}>
            <div className={styles.headerLeft}>
              <button className={styles.backButton} onClick={() => setIsModalOpen(true)}>
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
              <button className={styles.endTestButton} onClick={() => isFinished ? null : setIsFinishModalOpen(true)}>
                <div className={styles.endTestButton__icon}>
                  <img src="/dh/shutdown.png" alt="End Test" />
                </div>
                <span>{isFinished ? 'Test Tamamlandı' : 'Testi Bitir'}</span>
              </button>
            </div>
          </div>

          <div className={styles.mobileHeader}>
            <div className={styles.mobileTopRow}>
              <button className={styles.mobileBackButton} onClick={() => setIsModalOpen(true)}>
                <img src="/dh/arrow-left.svg" alt="Back" />
              </button>
              <Timer />
              <button className={styles.mobileMenuButton} onClick={() => setIsMobileMenuOpen(true)}>
                <span className={styles.threeDots}></span>
                <span className={styles.threeDots}></span>
                <span className={styles.threeDots}></span>
              </button>
            </div>
            <ProgressBar />
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
      <LeaveTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLeave}
      />
      <FinishTestModal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        onConfirm={handleConfirmFinish}
        emptyCount={stats.empty}
      />
      <TestResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        stats={stats}
      />
      <MobileMenuModal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onFinishTest={() => setIsFinishModalOpen(true)}
        onShowAnswerSheet={() => {}}
      />
    </Layout>
    </ThemeProvider>
  );
};