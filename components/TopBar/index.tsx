import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Logo from 'public/logo.svg';

import styles from './TopBar.module.scss';

export default function TopBar () {
  const t = useTranslations('SearchRepos');
  
  return (
    <header className={styles.Header}>
      <Image
        src={Logo}
        alt={t('title')}
        className={styles.Logo}
      />
      <h1 className={styles.Name}>{t('title')}</h1>
    </header>
  );
}