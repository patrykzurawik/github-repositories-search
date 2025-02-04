import { ReposSearchQueryParams } from 'types/repos';

export const DEFAULT_SEARCH_PARAMS: Partial<ReposSearchQueryParams> = {
  page: 1,
  per_page: 20,
  sort: 'stars',
  order: 'desc',
};

export const DEFAULT_SEARCH_PARAMS_ORDER =
  ['q', 'page', 'per_page', 'sort', 'order'] as (keyof ReposSearchQueryParams)[];

export const SEARCH_RESULTS_LIMIT = 1000;