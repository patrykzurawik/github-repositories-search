import { ReposSearchParams } from 'lib/octokit/types/repos';
import { ReposSearchQueryParams } from 'types/repos';

export const formatReposSearchQueryParamsForApi = (params: ReposSearchQueryParams): ReposSearchParams => ({
  q: params.q,
});