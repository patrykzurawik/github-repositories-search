import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

import styles from './ButtonPrimary.module.scss';

type TButtonPrimaryProps = ButtonHTMLAttributes<unknown>
  & {
  children: React.ReactNode,
  className?: string,
};

export default function ButtonPrimary ({ 
  children,
  className,
  ...rest
}: TButtonPrimaryProps) {
  return <button
    {...rest}
    className={clsx(styles.ButtonPrimary, className)}
  >
    {children}
  </button>;
    
}