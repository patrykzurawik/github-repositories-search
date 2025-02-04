import TopBar from 'components/TopBar';

import 'styles/globals.scss';
import styles from './layout.module.scss';

export default async function SearchLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles.Wrapper}>
      <TopBar />
      {children}
    </section>
  );
}
