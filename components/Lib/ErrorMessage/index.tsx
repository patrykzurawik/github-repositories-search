import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTE_INDEX } from 'constants/routes';

import Alert from 'components/Lib/Alert';
import ButtonSecondary from 'components/Lib/Button/Secondary';

import styles from './ErrorMessage.module.scss';

type TErrorMessageProps = {
  error: Error;
  reset: () => void;
}

export default function ErrorMessage ({ 
  error,
  reset,
}: TErrorMessageProps) {
  const t = useTranslations();
  const router = useRouter();
  
  return (
    <Alert
      type='error'
      className={styles.ErrorMessage}
    >
      {String(error) ?? t('ErrorBoundary.title')}

      <div className={styles.Buttons}>
        <ButtonSecondary onClick={() => reset()}>
          {t('CTA.tryAgain')}
        </ButtonSecondary>

        <ButtonSecondary onClick={() => router.push(ROUTE_INDEX())}>
          {t('CTA.reset')}

        </ButtonSecondary>
      </div>
    </Alert>
  );
}