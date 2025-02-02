import { fetchCachedData } from 'actions/searchRepos';
import { formatReposSearchQueryParamsForApi } from 'lib/octokit/helpers/formatters/repos';
import { ReposSearchQueryParams } from 'types/repos';

type ResultsPageProps = { 
  searchParams: Promise<ReposSearchQueryParams>;
}

export default async function ResultsPage ({ searchParams }: ResultsPageProps) {
  const params = (await searchParams);
  const data = await fetchCachedData(formatReposSearchQueryParamsForApi(params));

  return <pre style={{ whiteSpace: 'pre-wrap' }}>
    {JSON.stringify({ params, data }, null, 2) ?? 'no data'}
  </pre>;
}