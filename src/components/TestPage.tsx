import { Layout } from './layout/Layout';
import { QuestionCard } from './question/QuestionCard';
import { Optic } from './optic/Optic';
import styles from '../styles/modules/TestPage.module.scss';

export const TestPage = () => {
  return (
    <Layout>
      <div className={styles.testPage}>
        <div className={styles.questionArea}>
          <QuestionCard />
        </div>
        <div className={styles.opticArea}>
          <Optic />
        </div>
      </div>
    </Layout>
  );
};