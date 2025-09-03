import styles from '../../styles/modules/Options.module.scss';

export const Options = () => {
  const options = ['A', 'B', 'C', 'D', 'E'];
  return (
    <div className={styles.optionsContainer}>
      {options.map((option) => (
        <div key={option} className={styles.option}>
          <span className={styles.optionLetter}>{option}</span>
          <p>{option} şıkkı.</p>
        </div>
      ))}
    </div>
  );
};