'use client';

import { useEffect, useState } from 'react';
import DataTable, { TableProps } from 'react-data-table-component';

export type TListRow = Record<string, unknown>;

export type TListProps <TRow = TListRow> = {
  data: TableProps<TRow>['data'];
  columns: TableProps<TRow>['columns'];
  isLoading?: boolean;
  onSort?: TableProps<TRow>['onSort'];
}

export default function List ({ 
  data,
  columns,
  isLoading,
  onSort,
}: TListProps) {
  const [ items, setItems ] = useState<TListRow[]>(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <DataTable
      columns={columns}
      data={items}
      progressPending={isLoading}
      { ...onSort
        ? { onSort, sortServer: true }
        : null
      }
    />
  );
}