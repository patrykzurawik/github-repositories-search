import { LocatorFormError } from 'constants/locators';

import styles from './ErrorMessage.module.scss';

type TErrorMessageProps = {
  children: React.ReactNode;
}

export default function ErrorMessage ({ children }: TErrorMessageProps) {
  return (
    <span 
      role='alert'
      className={styles.ErrorMessage}
      data-ta={LocatorFormError}
    >
      {children}
    </span>
  );
};