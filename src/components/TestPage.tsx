import { useEffect, useState, useCallback, useRef } from 'react';
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

type ModalType = 'leave' | 'finish' | 'results' | 'mobileMenu' | null;

export const TestPage = () => {
  const dispatch = useAppDispatch();
  const { isFinished, showAnswers, currentQuestionIndex } = useAppSelector((s) => s.test);
  const stats = useAppSelector(selectTestStats);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const opticScrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(loadTestStart());
  }, [dispatch]);

  useEffect(() => {
    const container = opticScrollAreaRef.current;
    if (!container) return;

    const targetQuestionElement = container.querySelector(
      `[data-question-index="${currentQuestionIndex}"]`
    ) as HTMLElement;

    if (targetQuestionElement) {
      targetQuestionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentQuestionIndex]);

  const handleConfirmLeave = useCallback(() => {
    dispatch(finishTest());
    setActiveModal(null);
  }, [dispatch]);

  const handleConfirmFinish = useCallback(() => {
    console.log('Test Statistics:', {
      net: stats.net,
      correct: stats.correct,
      wrong: stats.wrong,
      empty: stats.empty
    });
    dispatch(finishTest());
    setActiveModal('results');
  }, [dispatch, stats]);

  return (
    <ThemeProvider>
      <Layout>
        <div className={styles.testPageContainer}>
        <header className={styles.header}>
          <div className={styles.desktopHeader}>
            <div className={styles.headerLeft}>
              <button className={styles.backButton} onClick={() => setActiveModal('leave')}>
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
              <button className={styles.endTestButton} onClick={() => isFinished ? null : setActiveModal('finish')}>
                <div className={styles.endTestButton__icon}>
                  <img src="/dh/shutdown.png" alt="End Test" />
                </div>
                <span>{isFinished ? 'Test Tamamlandı' : 'Testi Bitir'}</span>
              </button>
            </div>
          </div>

          <div className={styles.mobileHeader}>
            <div className={styles.mobileTopRow}>
              <button className={styles.mobileBackButton} onClick={() => setActiveModal('leave')}>
                <img src="/dh/arrow-left.svg" alt="Back" />
              </button>
              <Timer />
              <button className={styles.mobileMenuButton} onClick={() => setActiveModal('mobileMenu')}>
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
            <Optic ref={opticScrollAreaRef} />
          </div>
        </div>
      </div>
      <LeaveTestModal
        isOpen={activeModal === 'leave'}
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirmLeave}
      />
      <FinishTestModal
        isOpen={activeModal === 'finish'}
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirmFinish}
        emptyCount={stats.empty}
      />
      <TestResultsModal
        isOpen={activeModal === 'results'}
        onClose={() => setActiveModal(null)}
        stats={stats}
      />
      <MobileMenuModal
        isOpen={activeModal === 'mobileMenu'}
        onClose={() => setActiveModal(null)}
        onFinishTest={() => setActiveModal('finish')}
        onShowAnswerSheet={() => {}}
      />
    </Layout>
    </ThemeProvider>
  );
};