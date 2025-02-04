'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE_INDEX, ROUTE_SEARCH } from 'constants/routes';
import { SEARCH_RESULTS_LIMIT } from 'constants/search';
import { Repo } from 'lib/octokit/types/repos';
import { useReposSearch } from 'lib/queries/repos';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

import { TListProps } from 'components/Lib/List';

export default function useSearch (unsafeSearchParams: URLSearchParams) {
  const router = useRouter();
  
  const validationResult =
    validateUnsafeSearchQueryParams(Object.fromEntries(unsafeSearchParams.entries()));

  const [ params, setParams ] = useState<Partial<ReposSearchQueryParams>>(() => validationResult.data ?? {});

  const doSearch = (params: ReposSearchQueryParams) =>
    router.push(ROUTE_SEARCH(params));

  const onSort: TListProps<Partial<Repo>>['onSort'] = ({ sortField: sort  }, order) =>
    doSearch({ ...params, sort, order, page: 1 } as ReposSearchQueryParams);

  const onChangePage: TListProps<Partial<Repo>>['onChangePage'] = (page) =>
    doSearch({ ...params, page } as ReposSearchQueryParams);

  const onChangeRowsPerPage: TListProps<Partial<Repo>>['onChangeRowsPerPage'] = (per_page) =>
    doSearch({ ...params, per_page, page: 1 } as ReposSearchQueryParams);

  const { data, isLoading, isError } = useReposSearch(params
    ? params as ReposSearchQueryParams
    : null
  );

  const realTotalRows = Number(data?.total_count);
  const availableTotalRows = Math.min(realTotalRows, SEARCH_RESULTS_LIMIT);

  useEffect(() => {
    if (!validationResult.isSuccess)
      return router.push(ROUTE_INDEX());

    const areUrlParamsMissing = Object.keys(validationResult.data).length !== Array.from(unsafeSearchParams.keys()).length;

    if (areUrlParamsMissing)
      return doSearch(validationResult.data);

    setParams(validationResult.data);
  },
  [ validationResult, unsafeSearchParams ]);

  useEffect(() => {
    if (isError) {
      throw new Error(isError);
    };
  }, [isError]);
  
  return {
    isLoading, isError, data,

    onSort, onChangePage, onChangeRowsPerPage,
    realTotalRows, availableTotalRows,

    params,

    doSearch,
  };
}