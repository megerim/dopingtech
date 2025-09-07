import styles from '../../styles/modules/ProgressBar.module.scss';
import { useAppSelector } from '../../store/hooks';

export const ProgressBar = () => {
  const { questions, currentQuestionIndex } = useAppSelector((s) => s.test);
  const totalQuestions = questions.length;
  const currentQuestion = currentQuestionIndex + 1;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span className={styles.testTitle}>Temel Kavramlar Seviye Belirleme Sınavı</span>
        <span className={styles.questionCount}>
          {currentQuestion}/{totalQuestions}
        </span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progressPercentage}%` }}
        />
        <div className={styles.progressSegments}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className={styles.segment} />
          ))}
        </div>
      </div>
    </div>
  );
};