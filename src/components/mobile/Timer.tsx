import { useEffect, useState } from 'react';
import styles from '../../styles/modules/Timer.module.scss';

export const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = secs.toString().padStart(2, '0');

    return `${h}:${m}:${s}sn`;
  };

  return <div className={styles.timer}>{formatTime(time)}</div>;
};