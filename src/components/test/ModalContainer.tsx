import React from 'react';
import { LeaveTestModal } from '../modals/LeaveTestModal';
import { FinishTestModal } from '../modals/FinishTestModal';
import { TestResultsModal } from '../modals/TestResultsModal';
import { MobileMenuModal } from '../modals/MobileMenuModal';
import { ModalType } from '../../hooks/useModalManager';

interface ModalContainerProps {
  activeModal: ModalType;
  onClose: () => void;
  onConfirmLeave: () => void;
  onConfirmFinish: () => void;
  onOpenFinishModal: () => void;
  stats: {
    net: number;
    correct: number;
    wrong: number;
    empty: number;
  };
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  activeModal,
  onClose,
  onConfirmLeave,
  onConfirmFinish,
  onOpenFinishModal,
  stats
}) => {
  return (
    <>
      <LeaveTestModal
        isOpen={activeModal === 'leave'}
        onClose={onClose}
        onConfirm={onConfirmLeave}
      />
      <FinishTestModal
        isOpen={activeModal === 'finish'}
        onClose={onClose}
        onConfirm={onConfirmFinish}
        emptyCount={stats.empty}
      />
      <TestResultsModal
        isOpen={activeModal === 'results'}
        onClose={onClose}
        stats={stats}
      />
      <MobileMenuModal
        isOpen={activeModal === 'mobileMenu'}
        onClose={onClose}
        onFinishTest={onOpenFinishModal}
        onShowAnswerSheet={() => {}}
      />
    </>
  );
};