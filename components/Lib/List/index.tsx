'use client';

import { useEffect, useState } from 'react';
import DataTable, { TableProps } from 'react-data-table-component';

import { getTheme, styles } from './theme';

getTheme();

export type TListRow = Record<string, unknown>;

export type TListProps <TRow = TListRow> =
  Pick<TableProps<TRow>,
    'onChangePage'
    | 'paginationTotalRows'
    | 'paginationDefaultPage'
    | 'paginationPerPage'
    | 'paginationRowsPerPageOptions'
>
  & {
  data: TableProps<TRow>['data'];
  total: TableProps<TRow>['paginationTotalRows'];
  columns: TableProps<TRow>['columns'];
  isLoading?: boolean;
  onSort?: TableProps<TRow>['onSort'];
  className?: string;
}

export default function List ({ 
  data,
  columns,
  isLoading,

  onChangePage,
  paginationTotalRows,
  paginationDefaultPage,
  paginationPerPage = 50,
  paginationRowsPerPageOptions = [ 10, 20, 50, 100 ],

  onSort,
  className,
}: TListProps) {
  const [ items, setItems ] = useState<TListRow[]>(() => data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <DataTable
      columns={columns}
      data={items}
      progressPending={isLoading}

      pagination
      paginationServer
      onChangePage={onChangePage}
      paginationTotalRows={paginationTotalRows ?? 0}
      paginationDefaultPage={Number(paginationDefaultPage)}
      paginationPerPage={Number(paginationPerPage)}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}

      striped
      theme='ghs'
      customStyles={styles}

      { ...onSort
        ? { onSort, sortServer: true }
        : null
      }
      className={className}
    />
  );
}