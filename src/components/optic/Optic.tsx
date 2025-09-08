import { forwardRef } from 'react';
import styles from '../../styles/modules/Optic.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAnswer, setCurrentQuestionIndex } from '../../store/slices/testSlice';

export const Optic = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const answers = ['A', 'B', 'C', 'D', 'E'];
  const dispatch = useAppDispatch();
  const { questions, userAnswers, isFinished, currentQuestionIndex, showAnswers } = useAppSelector((s) => s.test);
  const soruSayisi = questions.length || 15;
  const answeredCount = questions.filter((q) => userAnswers[q.id]).length;

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <img
          className={styles.header__icon}
          alt="Türkçe"
          src="/dh/turkce.png"
        />
        <div className={styles.header__content}>
          <h2 className={styles.header__title}>Türkçe</h2>
          <p className={styles.header__subtitle}>{`${answeredCount}/${soruSayisi} Soru`}</p>
        </div>
      </header>

      <div className={styles.scrollArea} ref={ref}>
        <div className={styles.questionsList}>
          {Array.from({ length: soruSayisi }).map((_, i) => {
            const qId = questions[i]?.id ?? String(i + 1);
            const isActive = i === currentQuestionIndex;
            const isAnswered = Boolean(userAnswers[qId]);
            
            const bgClass = isActive
              ? styles['questionItem__background--heavy']
              : isAnswered
              ? styles['questionItem__background--medium']
              : styles['questionItem__background--light'];
            const backgroundClassName = `${styles.questionItem__background} ${bgClass}`;
            
            return (
              <div
                key={i}
                className={styles.questionItem}
                onClick={() => dispatch(setCurrentQuestionIndex(i))}
                data-question-index={i}
              >
                <div className={styles.questionItem__content}>
                  <div className={backgroundClassName} />

                <div className={styles.questionItem__inner}>
                  <span className={styles.questionItem__label}>
                    Soru {i + 1}
                  </span>
                  <div className={styles.questionItem__options}>
                    {answers.map((letter) => {
                      const qId = questions[i]?.id ?? String(i + 1);
                      const selected = userAnswers[qId] === letter;
                      const correctLetter = questions[i]?.correctAnswer;
                      const showKeying = showAnswers && isFinished;
                      const className = showKeying
                        ? letter === correctLetter
                          ? styles['answerButton--correct']
                          : selected
                          ? styles['answerButton--incorrect']
                          : styles['answerButton--default']
                        : selected
                        ? styles['answerButton--selected']
                        : styles['answerButton--default'];
                      return (
                        <button
                          key={letter}
                          className={`${styles.answerButton} ${className}`}
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            questions[i] &&
                            dispatch(
                              selectAnswer({
                                questionId: questions[i].id,
                                answer: letter,
                              })
                            )
                          }}
                          disabled={isFinished}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});