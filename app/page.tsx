
import { SearchParams } from 'next/dist/server/request/search-params';
import { getTranslations } from 'next-intl/server';
import { fetchCachedData } from 'actions/searchRepos';
import { formatReposSearchQueryParamsForApi } from 'lib/octokit/helpers/formatters/repos';
import { ReposSearchResponse } from 'lib/octokit/types/repos';
import { getSearchSchema } from 'validators/search';

import SearchForm from 'components/SearchForm';
import SearchList from 'components/SearchList';

type TSearchPageProps = {
  searchParams: SearchParams;
}

export default async function SearchPage ({ searchParams }: TSearchPageProps) {
  const [ unsafeParams, t ] = await Promise.all([
    searchParams,
    getTranslations,
  ]);
  
  const { success, data: params } = await (getSearchSchema(t)).safeParse(unsafeParams);
  let data: ReposSearchResponse['data']['items'] = [];
  
  if (success) {
    data = (await fetchCachedData(formatReposSearchQueryParamsForApi(params))).items;
  }

  return <>
    <SearchForm />
    <SearchList data={data} />
  </>;
}
