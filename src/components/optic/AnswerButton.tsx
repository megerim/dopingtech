import { memo } from 'react';
import styles from '../../styles/modules/Optic.module.scss';
import { getAnswerButtonClassName } from '../../utils/opticHelpers';

interface AnswerButtonProps {
  letter: string;
  questionId: string;
  isSelected: boolean;
  isCorrect: boolean;
  isFinished: boolean;
  showAnswers: boolean;
  onClick: () => void;
}

export const AnswerButton = memo(
  ({
    letter,
    isSelected,
    isCorrect,
    isFinished,
    showAnswers,
    onClick,
  }: AnswerButtonProps) => {
    const className = getAnswerButtonClassName({
      isFinished,
      showAnswers,
      isSelected,
      isCorrect,
    });

    return (
      <button
        className={`${styles.answerButton} ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        disabled={isFinished}
      >
        {letter}
      </button>
    );
  },
);
