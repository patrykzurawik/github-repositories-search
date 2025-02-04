'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTE_INDEX, ROUTE_SEARCH } from 'constants/routes';
import { SEARCH_RESULTS_LIMIT } from 'constants/search';
import { Repo } from 'lib/octokit/types/repos';
import { useReposSearch } from 'lib/queries/repos';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

import List, { TListProps } from 'components/Lib/List';
import ColumnCreated from 'components/SearchList/Columns/Created';
import ColumnName from 'components/SearchList/Columns/Name';
import ColumnOwner from 'components/SearchList/Columns/Owner';
import ColumnStars from 'components/SearchList/Columns/Stars';
import ItemsCount from 'components/SearchList/ItemsCount';

import styles from './SearchList.module.scss';

export default function SearchList () {
  const t = useTranslations();
  const router = useRouter();
  const unsafeSearchParams = useSearchParams();

  const validationResult =
    validateUnsafeSearchQueryParams(Object.fromEntries(unsafeSearchParams.entries()));

  const [ params, setParams ] = useState<Partial<ReposSearchQueryParams>>(() => validationResult.data ?? {});

  const columns: TListProps<Repo>['columns'] = [
    {
      name: t('Results.list.name'),
      selector: (row) => row.name,
      sortable: true,
      sortField: 'name',
      format: (row) => <ColumnName row={row} />,
      grow: 4,
    },
    {
      name: t('Results.list.owner'),
      selector: (row) => row.owner?.login ?? '',
      format: (row) => <ColumnOwner row={row} />,
      grow: 1,
    },
    {
      name: t('Results.list.stars'),
      sortable: true,
      sortField: 'stars',
      selector: (row) => row.stargazers_count,
      format: (row) => <ColumnStars row={row} />,
    },
    {
      name: t('Results.list.createdAt'),
      selector: (row) => row.created_at,
      format: (row) => <ColumnCreated row={row} />,
    },
  ];

  const onSort: TListProps<Partial<Repo>>['onSort'] = ({ sortField: sort  }, order) =>
    router.push(ROUTE_SEARCH({ ...params, sort, order, page: 1 } as ReposSearchQueryParams));

  const onChangePage: TListProps<Partial<Repo>>['onChangePage'] = (page) =>
    router.push(ROUTE_SEARCH({ ...params, page } as ReposSearchQueryParams));

  const onChangeRowsPerPage: TListProps<Partial<Repo>>['onChangeRowsPerPage'] = (per_page) =>
    router.push(ROUTE_SEARCH({ ...params, per_page, page: 1 } as ReposSearchQueryParams));

  const { data, isLoading, isError } = useReposSearch(params
    ? params as ReposSearchQueryParams
    : null
  );
  
  const realTotalRows = Number(data?.total_count);
  const availableTotalRows = Math.min(realTotalRows, SEARCH_RESULTS_LIMIT);

  useEffect(() => {
    if (!validationResult.isSuccess)
      return router.push(ROUTE_INDEX());

    if (Object.keys(validationResult.data).length !== Array.from(unsafeSearchParams.keys()).length)
      return router.push(ROUTE_SEARCH(validationResult.data));

    setParams(validationResult.data);
  },
  [ validationResult, unsafeSearchParams ]);

  useEffect(() => {
    if (isError) {
      throw new Error(isError);
    };
  }, [isError]);

  return (
    <List
      data={data?.items ?? []}
      columns={columns}
      isLoading={isLoading || !data?.items}
      onSort={onSort}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      paginationDefaultPage={params.page}
      paginationPerPage={params.per_page}
      paginationTotalRows={availableTotalRows}
      className={styles.SearchList}
    >
      { (realTotalRows > 0 && !isLoading)
        && <ItemsCount totalRows={realTotalRows} />
      }
    </List>
  );
}