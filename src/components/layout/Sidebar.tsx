import styles from '../../styles/modules/Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div>
        Doping Hafıza
      </div>
      <nav className={styles.nav}>
        <a href="#link1" className={styles.navLink}>
          Link 1
        </a>
        <a href="#link2" className={styles.navLink}>
          Link 2
        </a>
        <a href="#link3" className={styles.navLink}>
          Link 3
        </a>
      </nav>
    </aside>
  );
};