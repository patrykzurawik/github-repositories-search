'use client';

import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import styles from './Spinner.module.scss';

export default function Spinner () {
  const t = useTranslations();
  
  return (
    <span
      aria-busy='true'
      aria-live='polite'
      aria-label={t('Spinner.label')}
      className={clsx(styles.Spinner, 'spinner')}
    />
  );
}