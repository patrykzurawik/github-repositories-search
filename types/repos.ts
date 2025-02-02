import { ReposSearchParams } from 'lib/octokit/types/repos';

export type ReposSearchQueryParamsWithoutSorting = {
  sort?: never;
  order?: never;
}

export type ReposSearchQueryParamsWithSorting = {
  sort: ReposSearchParams['sort'];
  order: ReposSearchParams['order'];
}

export type ReposSearchQueryParams = {
  q: ReposSearchParams['q'];
} & (
  ReposSearchQueryParamsWithoutSorting
  | ReposSearchQueryParamsWithSorting
);