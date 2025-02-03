import { fetchCachedData } from 'actions/repos';
import { formatReposSearchQueryParamsForApi } from 'lib/octokit/helpers/formatters/repos';
import { ReposSearchResponse } from 'lib/octokit/types/repos';
import useSWR from 'swr';
import { ReposSearchQueryParams } from 'types/repos';

export const useReposSearch = (params: Partial<ReposSearchQueryParams> | null) => {
  const {
    data,
    error,
    isLoading,
  } = useSWR<ReposSearchResponse['data']>(
    params && Object.keys(params).length
      ? ['fetchCachedRepos', params]
      : null,
    fetchCachedData.bind(null, formatReposSearchQueryParamsForApi(params as ReposSearchQueryParams))
  );

  return {
    isLoading,
    isError: error,
    data,
  };
};