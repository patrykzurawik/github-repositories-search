import { useTranslations } from 'next-intl';

import styles from './TopBar.module.scss';

export default function TopBar () {
  const t = useTranslations('SearchRepos');
  
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{t('title')}</h1>
    </header>
  );
}