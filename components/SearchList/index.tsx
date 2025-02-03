'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTE_INDEX, ROUTE_SEARCH } from 'constants/routes';
import { Repo } from 'lib/octokit/types/repos';
import { useReposSearch } from 'lib/queries/repos';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

import List, { TListProps } from 'components/Lib/List';
import ColumnCreated from 'components/SearchList/Columns/Created';
import ColumnName from 'components/SearchList/Columns/Name';
import ColumnOwner from 'components/SearchList/Columns/Owner';
import ColumnStars from 'components/SearchList/Columns/Stars';

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
      // TODO: fix sorting if possible
      name: t('Results.list.owner'),
      sortable: true,
      sortField: 'owner',
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
      // TODO: fix sorting if possible
      name: t('Results.list.createdAt'),
      sortable: true,
      sortField: 'created',
      selector: (row) => row.created_at,
      format: (row) => <ColumnCreated row={row} />,
    },
  ];

  const onSort: TListProps<Partial<Repo>>['onSort'] = ({ sortField: sort  }, order) =>
    router.push(ROUTE_SEARCH({ ...params, sort: sort, order, page: 1 } as ReposSearchQueryParams));

  const onChangePage: TListProps<Partial<Repo>>['onChangePage'] = (page) =>
    router.push(ROUTE_SEARCH({ ...params, page } as ReposSearchQueryParams));

  const { data, isLoading, isError } = useReposSearch(params
    ? params as ReposSearchQueryParams
    : null
  );

  useEffect(() => {
    if (!validationResult.isSuccess)
      return router.push(ROUTE_INDEX());
    
    setParams(validationResult.data);
  },
  [ validationResult ]);

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
      paginationDefaultPage={params.page}
      paginationTotalRows={data?.total_count}
      className={styles.SearchList}
    />
  );
}