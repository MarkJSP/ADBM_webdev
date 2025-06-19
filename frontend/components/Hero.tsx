import { ReactNode } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.controls}>{children}</div>
      </div>
    </section>
  );
}
