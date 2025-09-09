import { memo } from 'react';
import styles from '../../styles/modules/Optic.module.scss';
import { AnswerButton } from './AnswerButton';
import { useAppDispatch } from '../../store/hooks';
import {
  selectAnswer,
  setCurrentQuestionIndex,
} from '../../store/slices/testSlice';
import { Question } from '../../store/slices/testSlice';

interface QuestionRowProps {
  question: Question | undefined;
  questionIndex: number;
  isActive: boolean;
  isAnswered: boolean;
  userAnswer: string | undefined;
  isFinished: boolean;
  showAnswers: boolean;
}

const ANSWER_OPTIONS = ['A', 'B', 'C', 'D', 'E'] as const;

export const QuestionRow = memo(
  ({
    question,
    questionIndex,
    isActive,
    isAnswered,
    userAnswer,
    isFinished,
    showAnswers,
  }: QuestionRowProps) => {
    const dispatch = useAppDispatch();
    const questionId = question?.id ?? String(questionIndex + 1);

    const getBackgroundClass = () => {
      if (isActive) return styles['questionItem__background--heavy'];
      if (isAnswered) return styles['questionItem__background--medium'];
      return styles['questionItem__background--light'];
    };

    const handleRowClick = () => {
      dispatch(setCurrentQuestionIndex(questionIndex));
    };

    const handleAnswerClick = (letter: string) => {
      if (question) {
        dispatch(selectAnswer({ questionId: question.id, answer: letter }));
      }
    };

    return (
      <div
        className={styles.questionItem}
        onClick={handleRowClick}
        data-question-index={questionIndex}
      >
        <div className={styles.questionItem__content}>
          <div
            className={`${styles.questionItem__background} ${getBackgroundClass()}`}
          />

          <div className={styles.questionItem__inner}>
            <span className={styles.questionItem__label}>
              Soru {questionIndex + 1}
            </span>
            <div className={styles.questionItem__options}>
              {ANSWER_OPTIONS.map((letter) => (
                <AnswerButton
                  key={letter}
                  letter={letter}
                  questionId={questionId}
                  isSelected={userAnswer === letter}
                  isCorrect={question?.correctAnswer === letter}
                  isFinished={isFinished}
                  showAnswers={showAnswers}
                  onClick={() => handleAnswerClick(letter)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
