'use client';

import React, { useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { useTranslations } from 'next-intl';

import ButtonSecondary from 'components/Lib/Button/Secondary';

import styles from './error.module.scss';

export default function Error ({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div
    role='alert'
    aria-live='assertive'
    className={styles.ErrorBoundary}
  >
    <span className={styles.Title}>
      <MdError />
      {t('ErrorBoundary.title')}
    </span>

    <ButtonSecondary onClick={() => document.location.reload()}>
      {t('CTA.tryAgain')}
    </ButtonSecondary>
  </div>;
}