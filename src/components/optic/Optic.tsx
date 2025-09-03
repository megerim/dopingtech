import styles from '../../styles/modules/Optic.module.scss';

export const Optic = () => {
  let soruSayisi = 15;

  return (
    <div className={styles.opticContainer}>
      <div className={styles.opticHeader}>
        <h3>Türkçe</h3>
        <p>{soruSayisi} Soru</p>
      </div>
      <div className={styles.opticGrid}>
        {Array.from({ length: soruSayisi }).map((_, i) => {
          const num = i + 1;
          return <div key={num} className={styles.questionNumber}>{num}</div>;
        })}
      </div>
    </div>
  );
};