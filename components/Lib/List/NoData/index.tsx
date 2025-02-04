'use client';

import { FaRegSadTear } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

import styles from './NoData.module.scss';

export default function NoData () {
  const t = useTranslations();
  
  return (
    <span className={styles.NoData}>
      <FaRegSadTear className={styles.Icon} />
      {t('List.noDataMessage')}
    </span>
  );
}