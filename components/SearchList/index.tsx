'use client';

import { useTranslations } from 'next-intl';
import { Repo } from 'lib/octokit/types/repos';

import List, { TListProps } from 'components/Lib/List';

type TSearchListProps = {
  data: Repo[];
}

export default function SearchList ({ data }: TSearchListProps) {
  const t = useTranslations('Results.list');

  const columns: TListProps<Repo>['columns'] = [
    {
      name: t('name'),
      selector: (row) => row.full_name,
      sortable: true,
      sortField: 'name',
    },
    {
      name: t('owner'),
      selector: (row) => row.owner?.login ?? '',
      sortable: true,
      sortField: 'owner',
    },
    {
      name: t('stars'),
      selector: (row) => row.stargazers_count,
      sortable: true,
      sortField: 'stars',
    },
    {
      name: t('createdAt'),
      selector: (row) => row.created_at,
      sortable: true,
      sortField: 'created_at',
    },
  ];

  return (
    <List 
      data={data}
      columns={columns}
    />
  );
}