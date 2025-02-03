import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Logo from 'components/Logo';
import SearchForm from 'components/SearchForm';

import styles from './page.module.scss';

export async function generateMetadata (): Promise<Metadata> {
  const t = await getTranslations('SearchRepos');
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function SearchPage () {
  return <section className={styles.Wrapper}>
    <Logo isAlternative />

    <SearchForm />
  </section>;
}
