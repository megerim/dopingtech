import styles from '../../styles/modules/Optic.module.scss';

export const Optic = () => {
  const soruSayisi = 15;
  const answers = ['A', 'B', 'C', 'D', 'E'];

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
          <p className={styles.header__subtitle}>
            {`${soruSayisi} Soru`}
          </p>
        </div>
      </header>

      <div className={styles.scrollArea}>
        <div className={styles.questionsList}>
          {Array.from({ length: soruSayisi }).map((_, i) => (
            <div
              key={i}
              className={styles.questionItem}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.questionItem__content}>
                <div className={`${styles.questionItem__background} ${styles['questionItem__background--light']}`} />

                <div className={styles.questionItem__inner}>
                  <span className={styles.questionItem__label}>
                    Soru {i + 1}
                  </span>
                  <div className={styles.questionItem__options}>
                    {answers.map((letter) =>
                      <button
                        key={letter}
                        className={`${styles.answerButton} ${styles['answerButton--default']}`}
                      >
                        {letter}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};