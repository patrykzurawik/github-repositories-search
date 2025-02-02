'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTE_SEARCH } from 'constants/routes';
import { Repo } from 'lib/octokit/types/repos';
import { useReposSearch } from 'lib/queries/repos';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

import List, { TListProps } from 'components/Lib/List';

export default function SearchList () {
  const t = useTranslations();
  const router = useRouter();
  const unsafeSearchParams = useSearchParams();

  const getValidatedParams = () =>
    validateUnsafeSearchQueryParams(Object.fromEntries(unsafeSearchParams.entries()), t).data as ReposSearchQueryParams;
  const [ params, setParams ] = useState<ReposSearchQueryParams>(getValidatedParams());

  const columns: TListProps<Repo>['columns'] = [
    {
      name: t('Results.list.name'),
      selector: (row) => row.name,
      sortable: true,
      sortField: 'name',
    },
    {
      // TODO: fix sorting if possible
      name: t('Results.list.owner'),
      selector: (row) => row.owner?.login ?? '',
      sortable: true,
      sortField: 'owner',
    },
    {
      name: t('Results.list.stars'),
      selector: (row) => row.stargazers_count,
      sortable: true,
      sortField: 'stars',
    },
    {
      // TODO: fix sorting if possible
      name: t('Results.list.createdAt'),
      selector: (row) => row.created_at,
      sortable: true,
      sortField: 'created',
    },
  ];

  const onSort: TListProps<Repo>['onSort'] = ({ sortField: sort }, order) =>
    router.push(ROUTE_SEARCH({ ...params, sort, order, page: 1 }));

  const onChangePage: TListProps<Repo>['onChangePage'] = (page) =>
    router.push(ROUTE_SEARCH({ ...params, page }));

  const { data, isLoading } = useReposSearch(params
    ? params as ReposSearchQueryParams
    : null
  );

  useEffect(() => {
    setParams(getValidatedParams());
  },
  [ unsafeSearchParams ]);

  return (
    <List 
      data={data?.items}
      columns={columns}
      isLoading={isLoading}
      onSort={onSort}
      onChangePage={onChangePage}
      paginationDefaultPage={params.page}
      paginationTotalRows={data?.total_count}
    />
  );
}