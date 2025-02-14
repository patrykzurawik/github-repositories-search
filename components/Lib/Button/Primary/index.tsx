import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { LocatorButton, LocatorButtonPrimary } from 'constants/locators';

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
    data-ta={clsx(LocatorButton, LocatorButtonPrimary)}
  >
    {children}
  </button>;
    
}