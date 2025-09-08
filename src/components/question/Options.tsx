import { memo } from 'react';
import styles from '../../styles/modules/Options.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAnswer } from '../../store/slices/testSlice';
import { formatTextWithStyles } from '../../utils/textFormatter';

const OptionsComponent = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, userAnswers, isFinished, showAnswers } = useAppSelector(
    (s) => s.test
  );
  const current = questions[currentQuestionIndex];
  const options = ['A', 'B', 'C', 'D', 'E'];


  return (
    <form
      className={styles.answerOptions}
      onSubmit={(e) => e.preventDefault()}
      role="radiogroup"
      aria-label="Cevap seçenekleri"
    >
      {options.map((option, index) => {
        const selectedValue = current ? userAnswers[current.id] : undefined;
        const isSelected = selectedValue === option;
        const reveal = showAnswers && isFinished;
        const isCorrect = reveal && current?.correctAnswer === option;
        const isIncorrect = reveal && isSelected && current?.correctAnswer !== option;
        
        let textClass = styles['text--default'];
        if (isCorrect) {
          textClass = styles['text--correct'];
        } else if (isIncorrect) {
          textClass = styles['text--incorrect'];
        }
        
        const optionText = current && current.options && current.options[option]
          ? formatTextWithStyles({
              text: current.options[option],
              className: {
                underline: styles.underline,
                bold: styles.bold,
                both: styles.both,
              },
            })
          : `${index + 1}. seçenek`;
        
        const baseClass = styles.answerItem__background;
        let stateClass = styles['answerItem__background--default'];
        if (isCorrect) {
          stateClass = styles['answerItem__background--correct'];
        } else if (isIncorrect) {
          stateClass = styles['answerItem__background--incorrect'];
        } else if (isSelected) {
          stateClass = styles['answerItem__background--selected'];
        }
        const backgroundClassName = `${baseClass} ${stateClass}`;
        
        return (
          <label key={option} className={styles.answerItem}>
            <div className={styles.answerItem__icon}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={isSelected}
                onChange={() =>
                  current &&
                  dispatch(
                    selectAnswer({ questionId: current.id, answer: option })
                  )
                }
                className={styles.visuallyHidden}
                disabled={isFinished}
              />
              <span className={styles.checkbox}>
                <span className={styles.checkbox__dot} />
              </span>
            </div>
            <div className={styles.answerItem__text}>
              <span className={textClass}>
                {option}) {optionText}
              </span>
            </div>
            <div className={backgroundClassName} />
          </label>
        );
      })}
    </form>
  );
};

export const Options = memo(OptionsComponent);
