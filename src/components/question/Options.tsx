import { useState } from 'react';
import styles from '../../styles/modules/Options.module.scss';

export const Options = () => {
  const options = ['A', 'B', 'C', 'D', 'E'];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <form
      className={styles.answerOptions}
      onSubmit={(e) => e.preventDefault()}
      role="radiogroup"
      aria-label="Cevap seçenekleri"
    >
      {options.map((option, index) => {
        const isSelected = selected === index;
        return (
          <label key={option} className={styles.answerItem}>
            <div className={styles.answerItem__icon}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={isSelected}
                onChange={() => setSelected(index)}
                className={styles.visuallyHidden}
              />
              <span className={styles.checkbox}>
                <span className={styles.checkbox__dot} />
              </span>
            </div>
            <div className={styles.answerItem__text}>
              <span className={styles['text--default']}>
                {option}) Bu {index + 1}. seçenek metnidir.{' '}
                <span className={styles.bold}>Kalın kelime</span> burada.
              </span>
            </div>
            <div
              className={`${styles.answerItem__background} ${
                isSelected
                  ? styles['answerItem__background--selected']
                  : styles['answerItem__background--default']
              }`}
            />
          </label>
        );
      })}
    </form>
  );
};
