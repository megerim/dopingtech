import styles from '../../styles/modules/Layout.module.scss';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useTheme();

  return (
    <div className={styles.layout} data-theme={isMobile ? 'mobile' : 'desktop'}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};
