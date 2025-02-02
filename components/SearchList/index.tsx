'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Repo } from 'lib/octokit/types/repos';
import { useReposSearch } from 'lib/queries/repos';
import { validateUnsafeSearchParams } from 'validators/search';

import List, { TListProps } from 'components/Lib/List';

export default function SearchList () {
  const t = useTranslations();
  const unsafeSearchParams = useSearchParams();
  const { success, params } = validateUnsafeSearchParams(unsafeSearchParams, t);

  const columns: TListProps<Repo>['columns'] = [
    {
      name: t('Results.list.name'),
      selector: (row) => row.full_name,
      sortable: true,
      sortField: 'name',
    },
    {
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
      name: t('Results.list.createdAt'),
      selector: (row) => row.created_at,
      sortable: true,
      sortField: 'created_at',
    },
  ];

  const { data, isLoading } = useReposSearch(success ? params : null);

  return (
    <List 
      data={data?.items}
      columns={columns}
      isLoading={isLoading}
    />
  );
}