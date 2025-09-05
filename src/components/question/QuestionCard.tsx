import styles from '../../styles/modules/QuestionCard.module.scss';
import { Options } from './Options';
import { useAppSelector } from '../../store/hooks';
import { formatTextWithStyles } from '../../utils/textFormatter';

export const QuestionCard = () => {
  
  const { questions, currentQuestionIndex, isLoading, error } = useAppSelector(
    (s) => s.test
  );
  const current = questions[currentQuestionIndex];

  return (
    <div className={styles.questionCard}>
      <div className={styles.headerSection}>
        <div className={styles.badge}>
          <span>
            {isLoading
              ? 'Yükleniyor…'
              : error
              ? `Hata: ${error}`
              : `Soru: Türkçe #${currentQuestionIndex + 1}`}
          </span>
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
        {(() => {
          if (current) {
            return (
              <>
                {current.description && (
                  <div className={styles.quoteText}>
                    <p>{current.description}</p>
                  </div>
                )}
                <div className={styles.question}>
                  <p>
                    {formatTextWithStyles({
                      text: current.question,
                      className: {
                        underline: styles.highlight,
                        bold: styles.bold,
                        both: styles.both,
                      },
                    })}
                  </p>
                </div>
                {current.text && (
                  <div className={styles.quoteText}>
                    <p>{current.text}</p>
                  </div>
                )}
                <Options />
              </>
            );
          } else {
            return null;
          }
        })()}
      </div>
    </div>
  );
};
