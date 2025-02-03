import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import SearchForm from 'components/SearchForm';

export async function generateMetadata (): Promise<Metadata> {
  const t = await getTranslations('SearchRepos');
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function SearchPage () {
  return <>
    <SearchForm />
  </>;
}
