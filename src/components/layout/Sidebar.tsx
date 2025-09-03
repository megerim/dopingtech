import styles from '../../styles/modules/Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img alt="Logo" src="/dh/logo.png" />
      </div>

      <div className={styles.mainNav}>
        <div className={`${styles.navIcon} ${styles['navIcon--grid']}`}>
          <img alt="Layout grid" src="/dh/layout-grid.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--book']}`}>
          <img alt="Book" src="/dh/book.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--list']}`}>
          <img alt="Layout list" src="/dh/layout-list.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--check']}`}>
          <img alt="File check" src="/dh/file-check.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--inspect']}`}>
          <img alt="Inspect" src="/dh/inspect.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--activity']}`}>
          <img alt="Activity" src="/dh/activity.svg" />
        </div>
      </div>
    </aside>
  );
};
