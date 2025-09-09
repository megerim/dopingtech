import { useMemo, memo } from 'react';
import { formatTextWithStyles } from '../../utils/textFormatter';
import styles from '../../styles/modules/Options.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { selectAnswer } from '../../store/slices/testSlice';

interface OptionItemProps {
  option: string;
  index: number;
  currentId: string | undefined;
  optionText: string;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  isFinished: boolean;
  textClass: string;
  backgroundClassName: string;
  showSolutionButton: boolean;
}

const OptionItemComponent = ({
  option,
  index,
  currentId,
  optionText,
  isSelected,
  isCorrect,
  isIncorrect,
  isFinished,
  textClass,
  backgroundClassName,
  showSolutionButton,
}: OptionItemProps) => {
  const dispatch = useAppDispatch();

  const formattedOptionText = useMemo(() => {
    if (!optionText || optionText === `${index + 1}. seçenek`) {
      return `${index + 1}. seçenek`;
    }

    return formatTextWithStyles({
      text: optionText,
      className: {
        underline: styles.underline,
        bold: styles.bold,
        both: styles.both,
      },
    });
  }, [optionText, index]);

  const handleChange = () => {
    if (currentId) {
      dispatch(selectAnswer({ questionId: currentId, answer: option }));
    }
  };

  const handleAnswerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!showSolutionButton && !isFinished) {
      handleChange();
    } else if (showSolutionButton) {
      console.log('Çözüm görüntüleme aksiyonu tetiklendi:', currentId, option);
    }
  };

  return (
    <label className={styles.answerItem}>
      <div className={backgroundClassName} />
      <div className={styles.answerItem__icon}>
        <input
          type="radio"
          name="answer"
          value={option}
          checked={isSelected}
          onChange={handleChange}
          className={styles.visuallyHidden}
          disabled={isFinished}
        />
        <span className={styles.checkbox}>
          <span className={styles.checkbox__dot} />
        </span>
      </div>
      <div className={styles.answerItem__text}>
        <span className={textClass}>
          {option}) {formattedOptionText}
        </span>
      </div>
      <button
        type="button"
        onClick={handleAnswerClick}
        disabled={isFinished && !showSolutionButton}
        className={
          showSolutionButton
            ? `${styles.actionButton} ${styles['actionButton--solution']}`
            : styles.actionButton
        }
        aria-label={showSolutionButton ? 'Çözümü görüntüle' : 'Cevapla'}
      >
        {showSolutionButton ? (
          <>
            <span className={styles.actionButton__iconWrapper}>
              <span className={styles.actionButton__playIcon} />
            </span>
            Çözümü görüntüle
          </>
        ) : (
          'Cevapla'
        )}
      </button>
    </label>
  );
};

export const OptionItem = memo(OptionItemComponent);
