import styles from './ErrorMessage.module.scss';

type TErrorMessageProps = {
  children: React.ReactNode;
}

export default function ErrorMessage ({ children }: TErrorMessageProps) {
  return (
    <span 
      role='alert'
      className={styles.ErrorMessage}
    >
      {children}
    </span>
  );
};