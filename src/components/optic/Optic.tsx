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
  const { subject } = useAppSelector((s) => s.test);
  const resolvedSubject = subject || 'Türkçe';

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.header__iconWrapper}>
          <img
            className={styles.header__iconImage}
            alt="Türkçe"
            src="/dh/turkce.png"
          />
        </div>
        <div className={styles.header__content}>
          <h2 className={styles.header__title}>{resolvedSubject}</h2>
          <p className={styles.header__subtitle}>{`${questionCount} Soru`}</p>
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
