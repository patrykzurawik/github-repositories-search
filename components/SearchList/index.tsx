'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useSearch from 'hooks/useSearch';
import { Repo } from 'lib/octokit/types/repos';

import List, { TListProps } from 'components/Lib/List';
import ColumnCreated from 'components/SearchList/Columns/Created';
import ColumnName from 'components/SearchList/Columns/Name';
import ColumnOwner from 'components/SearchList/Columns/Owner';
import ColumnStars from 'components/SearchList/Columns/Stars';
import ItemsCount from 'components/SearchList/ItemsCount';

import styles from './SearchList.module.scss';

export default function SearchList () {
  const t = useTranslations();
  const unsafeSearchParams = useSearchParams();
  
  const {
    isLoading, data,
    onSort, onChangePage, onChangeRowsPerPage,
    params,
    realTotalRows, availableTotalRows,
  } = useSearch(unsafeSearchParams);

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