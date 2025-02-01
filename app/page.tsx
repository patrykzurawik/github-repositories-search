import SearchForm from 'components/SearchForm';

import styles from './page.module.scss';

export default function Home () {
  return (
    <div className={styles.wrapper}>
      <SearchForm />
    </div>
  );
}
