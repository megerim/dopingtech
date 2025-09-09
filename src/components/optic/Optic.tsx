import { forwardRef } from 'react';
import styles from '../../styles/modules/Optic.module.scss';
import { useAppSelector } from '../../store/hooks';
import { QuestionRow } from './QuestionRow';

export const Optic = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const {
    questions,
    userAnswers,
    isFinished,
    currentQuestionIndex,
    showAnswers,
  } = useAppSelector((s) => s.test);
  const questionCount = questions.length || 15;
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
          <p
            className={styles.header__subtitle}
          >{`${answeredCount}/${questionCount} Soru`}</p>
        </div>
      </header>

      <div className={styles.scrollArea} ref={ref}>
        <div className={styles.questionsList}>
          {Array.from({ length: questionCount }).map((_, index) => {
            const question = questions[index];
            const questionId = question?.id ?? String(index + 1);
            const isActive = index === currentQuestionIndex;
            const isAnswered = Boolean(userAnswers[questionId]);
            const userAnswer = userAnswers[questionId];

            return (
              <QuestionRow
                key={index}
                question={question}
                questionIndex={index}
                isActive={isActive}
                isAnswered={isAnswered}
                userAnswer={userAnswer}
                isFinished={isFinished}
                showAnswers={showAnswers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});
