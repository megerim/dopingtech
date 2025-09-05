import styles from '../../styles/modules/Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img alt="Logo" src="/dh/logo.png" />
      </div>

      <div className={styles.mainNav}>
        <div className={`${styles.navIcon} ${styles['navIcon--grid']}`}>
          <img alt="Anasayfa" src="/dh/layout-grid.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--book']}`}>
          <img alt="Dersler" src="/dh/book.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--list']}`}>
          <img alt="Soru Bankası" src="/dh/layout-list.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--check']}`}>
          <img alt="Deneme Sınavları" src="/dh/file-check.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--inspect']}`}>
          <img alt="Rehberlik Videoları" src="/dh/inspect.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--activity']}`}>
          <img alt="İstatistik" src="/dh/activity.svg" />
        </div>
        <div className={`${styles.navIcon} ${styles['navIcon--special']}`}>
          <img alt="Ölçme Değerlendirme" src="/dh/vr.png" />
        </div>
      </div>

      {/* Applications */}
      <div className={styles.applications}>
        <div className={`${styles.appIcon} ${styles['appIcon--cozucu']}`}>
          <img alt="Çözücü App" src="/dh/sidebarCozucu.png" />
        </div>
        <div className={`${styles.appIcon} ${styles['appIcon--simdi']}`}>
          <img alt="Şimdi Anladım App" src="/dh/simdianladim.png" />
        </div>
        <div className={`${styles.appIcon} ${styles['appIcon--kocum']}`}>
          <img alt="Koçum Yanımda App" src="/dh/kocum.png" />
        </div>
      </div>

      {/* Feedback */}
      <div className={styles.feedbackSection}>
        <div className={styles.feedbackIcon}>
          <img alt="Görüş Öneri" src="/dh/message-square.svg" />
        </div>
      </div>
    </aside>
  );
};
