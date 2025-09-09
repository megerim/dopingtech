import styles from '../styles/modules/Optic.module.scss';

interface GetAnswerButtonClassNameParams {
  isFinished: boolean;
  showAnswers: boolean;
  isSelected: boolean;
  isCorrect: boolean;
}

export const getAnswerButtonClassName = ({
  isFinished,
  showAnswers,
  isSelected,
  isCorrect,
}: GetAnswerButtonClassNameParams): string => {
  const showKeying = showAnswers && isFinished;

  if (showKeying) {
    if (isCorrect) {
      return styles['answerButton--correct'];
    }
    if (isSelected) {
      return styles['answerButton--incorrect'];
    }
    return styles['answerButton--default'];
  }

  if (isSelected) {
    return styles['answerButton--selected'];
  }

  return styles['answerButton--default'];
};
