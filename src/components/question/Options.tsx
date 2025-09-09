import { memo } from 'react';
import styles from '../../styles/modules/Options.module.scss';
import { useAppSelector } from '../../store/hooks';
import { OptionItem } from './OptionItem';

const OptionsComponent = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    isFinished,
    showAnswers,
  } = useAppSelector((s) => s.test);
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
        // Yeni mantık: "Cevapları Göster" açık olsa bile sadece kullanıcı bu soruda seçim yaptıysa doğru/yanlış göster
        const reveal = showAnswers && !!selectedValue;
        const isCorrect = reveal && current?.correctAnswer === option;
        const isIncorrect =
          reveal && isSelected && current?.correctAnswer !== option;

        let textClass = styles['text--default'];
        if (isCorrect) {
          textClass = styles['text--correct'];
        } else if (isIncorrect) {
          textClass = styles['text--incorrect'];
        }

        const optionText = current?.options?.[option] || '';

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
        const showSolutionButton = reveal && isCorrect;

        return (
          <OptionItem
            key={option}
            option={option}
            index={index}
            currentId={current?.id}
            optionText={optionText}
            isSelected={isSelected}
            isCorrect={isCorrect}
            isIncorrect={isIncorrect}
            isFinished={isFinished}
            textClass={textClass}
            backgroundClassName={backgroundClassName}
            showSolutionButton={showSolutionButton}
          />
        );
      })}
    </form>
  );
};

export const Options = memo(OptionsComponent);
