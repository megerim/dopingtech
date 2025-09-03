import styles from '../../styles/modules/QuestionCard.module.scss';
import { Options } from './Options';

export const QuestionCard = () => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionText}>
        <p>Soru metni buraya gelecek.</p>
      </div>
      <Options />
    </div>
  );
};