import { fetchCachedData } from 'actions/searchRepos';
import { formatReposSearchQueryParamsForApi } from 'lib/octokit/helpers/formatters/repos';
import { ReposSearchQueryParams } from 'types/repos';

import SearchList from 'components/SearchList';

type ResultsPageProps = { 
  searchParams: Promise<ReposSearchQueryParams>;
}

export default async function ResultsPage ({ searchParams }: ResultsPageProps) {
  const params = (await searchParams);
  const data = await fetchCachedData(formatReposSearchQueryParamsForApi(params));

  return <SearchList data={data.items} />;
}