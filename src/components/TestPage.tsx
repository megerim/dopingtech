import { useEffect } from 'react';
import { Layout } from './layout/Layout';
import { QuestionCard } from './question/QuestionCard';
import { Optic } from './optic/Optic';
import { TestHeader } from './test/TestHeader';
import { TestNavigation } from './test/TestNavigation';
import { ModalContainer } from './test/ModalContainer';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTestStart } from '../store/slices/testSlice';
import { useModalManager } from '../hooks/useModalManager';
import { useOpticScroll } from '../hooks/useOpticScroll';
import { useTestActions } from '../hooks/useTestActions';
import styles from '../styles/modules/TestPage.module.scss';

export const TestPage = () => {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector((s) => s.test);
  
  const { activeModal, openModal, closeModal } = useModalManager();
  const opticScrollAreaRef = useOpticScroll(currentQuestionIndex);
  const { handleConfirmLeave, handleConfirmFinish, stats } = useTestActions();

  useEffect(() => {
    dispatch(loadTestStart());
  }, [dispatch]);

  const handleFinishTest = () => {
    const shouldOpenResults = handleConfirmFinish();
    if (shouldOpenResults) {
      openModal('results');
    }
  };

  return (
    <ThemeProvider>
      <Layout>
        <div className={styles.testPageContainer}>
          <TestHeader
            onOpenLeaveModal={() => openModal('leave')}
            onOpenFinishModal={() => openModal('finish')}
            onOpenMobileMenu={() => openModal('mobileMenu')}
          />

          <div className={styles.sectionsWrapper}>
            <div className={styles.questionArea}>
              <QuestionCard />
              <TestNavigation />
            </div>
            <div className={styles.opticArea}>
              <Optic ref={opticScrollAreaRef} />
            </div>
          </div>
        </div>

        <ModalContainer
          activeModal={activeModal}
          onClose={closeModal}
          onConfirmLeave={() => {
            handleConfirmLeave();
            closeModal();
          }}
          onConfirmFinish={handleFinishTest}
          onOpenFinishModal={() => openModal('finish')}
          stats={stats}
        />
      </Layout>
    </ThemeProvider>
  );
};