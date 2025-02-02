import { ReposSearchQueryParams } from 'types/repos';

export const ROUTE_SEARCH = (params: ReposSearchQueryParams) =>
  `/?${new URLSearchParams(params).toString()}`;