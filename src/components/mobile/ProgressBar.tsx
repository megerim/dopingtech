import styles from '../../styles/modules/ProgressBar.module.scss';
import { useAppSelector } from '../../store/hooks';

export const ProgressBar = () => {
  const { currentQuestionIndex } = useAppSelector((s) => s.test);
  const currentQuestion = currentQuestionIndex + 1;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span className={styles.testTitle}>
          Temel Kavramlar Seviye Belirleme Sınavı
        </span>
        <span className={styles.questionCount}>{currentQuestion}/15</span>
      </div>
      <div className={styles.progressBar} data-question={currentQuestion}>
        <div className={styles.progressFill} />
        <div className={styles.progressSegments}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className={styles.segment} />
          ))}
        </div>
      </div>
    </div>
  );
};
