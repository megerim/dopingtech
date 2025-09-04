import styles from '../../styles/modules/QuestionCard.module.scss';
import { Options } from './Options';

export const QuestionCard = () => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.headerSection}>
        <div className={styles.badge}>
          <span>Soru: Türkçe #1</span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <img src="/dh/brush.svg" alt="Brush" />
          </button>
          <button className={styles.actionButton}>
            <img src="/dh/zoom-in.svg" alt="Zoom in" />
          </button>
          <button className={styles.actionButton}>
            <img src="/dh/zoom-out.svg" alt="Zoom out" />
          </button>
          <button
            className={`${styles.actionButton} ${styles['actionButton--danger']}`}
          >
            <img src="/dh/alert-circle.svg" alt="Alert" />
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.quoteText}>
          <p>
            "Şair, şiirlerinde hava alacak boşluk bırakmıyor, her şeyi
            söylüyor..."
          </p>
        </div>
        <div className={styles.question}>
          <p>
            Bu parçada geçen "hava alacak boşluk bırakmamak" sözüyle anlatılmak
            istenen nedir?
          </p>
        </div>
        <Options />
      </div>
    </div>
  );
};
