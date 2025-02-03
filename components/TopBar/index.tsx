import Logo from 'components/Logo';
import SearchForm from 'components/SearchForm';

import styles from './TopBar.module.scss';

export default async function TopBar () {
  return (
    <div className={styles.TopBar}>
      <Logo />
      
      <SearchForm className={styles.Form} />
    </div>
  );
}