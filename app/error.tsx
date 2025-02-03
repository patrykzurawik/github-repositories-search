'use client';

import React, { useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import ButtonSecondary from 'components/Lib/Button/Secondary';
import styles from 'components/Lib/ErrorBoundary/ErrorBounday.module.scss';

export default function Error ({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const t = useTranslations();
  const router = useRouter();

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

    <ButtonSecondary onClick={() => router.refresh()}>
      {t('CTA.tryAgain')}
    </ButtonSecondary>
  </div>;
}