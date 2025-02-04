'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import Alert from 'components/Lib/Alert';
import ButtonSecondary from 'components/Lib/Button/Secondary';

import styles from '../error.module.scss';

export default function Error ({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const t = useTranslations();
  
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Alert type='error' className={styles.ErrorBoundary}>
    {t('ErrorBoundary.title')}
    <ButtonSecondary
      onClick={() => document.location.reload()}
      className={styles.Button}
    >
      {t('CTA.tryAgain')}
    </ButtonSecondary>
  </Alert>;
}