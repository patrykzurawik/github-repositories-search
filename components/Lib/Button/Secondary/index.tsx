import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { LocatorButton, LocatorButtonSecondary } from 'constants/locators';

import styles from 'components/Lib/Button/Secondary/Secondary.module.scss';

type TButtonSecondaryProps = ButtonHTMLAttributes<unknown>
  & {
  children: React.ReactNode,
  className?: string,
};

export default function ButtonSecondary ({
  children,
  className,
  ...rest
}: TButtonSecondaryProps) {
  return <button
    {...rest}
    className={clsx(styles.ButtonSecondary, className)}
    data-ta={clsx(LocatorButton, LocatorButtonSecondary)}
  >
    {children}
  </button>;
    
}