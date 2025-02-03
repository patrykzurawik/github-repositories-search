import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import SearchForm from 'components/SearchForm';
import SearchList from 'components/SearchList';

export async function generateMetadata (): Promise<Metadata> {
  const t = await getTranslations('Results');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function SearchPage () {
  return <>
    <SearchForm />
    <SearchList />
  </>;
}