import { MdError, MdInfo, MdWarning } from 'react-icons/md';
import { clsx } from 'clsx';

import styles from './Alert.module.scss';

type TAlertProps = {
  type?: 'warning' | 'error';
  children?: React.ReactNode;
  className?: string;
}

export default function Alert ({
  type,
  children,
  className,
}: TAlertProps) {
  const Icon =
    type 
      ? {
        'warning': MdWarning,
        'error': MdError,
      }[type]
      : MdInfo;

  return (
    <div 
      role='alert'
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={clsx(
        styles.Alert,
        type === 'warning' && styles.Warning,
        type === 'error' && styles.Error,
        className
      )}
    >
      <Icon className={styles.Icon} />
      {children}
    </div>
  );
}