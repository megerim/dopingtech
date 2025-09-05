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
              {(() => {
                let textClass = styles['text--default'];
                if (isCorrect) {
                  textClass = styles['text--correct'];
                } else if (isIncorrect) {
                  textClass = styles['text--incorrect'];
                }
                return (
                  <span className={textClass}>
                    {option}{' '}
                    {(() => {
                      if (current && current.options && current.options[option]) {
                        return formatTextWithStyles({
                          text: current.options[option],
                          className: {
                            underline: styles.underline,
                            bold: styles.bold,
                            both: styles.both,
                          },
                        });
                      } else {
                        return `${index + 1}. seçenek`;
                      }
                    })()}
                  </span>
                );
              })()}
            </div>
            {(() => {
              const baseClass = styles.answerItem__background;
              let stateClass = styles['answerItem__background--default'];
              if (isCorrect) {
                stateClass = styles['answerItem__background--correct'];
              } else if (isIncorrect) {
                stateClass = styles['answerItem__background--incorrect'];
              } else if (isSelected) {
                stateClass = styles['answerItem__background--selected'];
              }
              return <div className={`${baseClass} ${stateClass}`} />;
            })()}
          </label>
        );
      })}
    </form>
  );
};

export const Options = memo(OptionsComponent);
