import { fetchCachedData } from 'actions/repos';
import { ReposSearchResponse } from 'lib/octokit/types/repos';
import useSWR from 'swr';
import { ReposSearchQueryParams } from 'types/repos';

export const useReposSearch = (params: ReposSearchQueryParams | null) => {
  const {
    data,
    error,
    isLoading,
  } = useSWR<ReposSearchResponse['data']>(
    params
      ? ['fetchCachedRepos', params]
      : null,
    fetchCachedData.bind(null, params as ReposSearchQueryParams)
  );

  return {
    isLoading,
    isError: error,
    data,
  };
};