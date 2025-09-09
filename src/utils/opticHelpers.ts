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
  if (isSelected) {
    return styles['answerButton--selected'];
  }

  return styles['answerButton--default'];
};
