'use client';

import { useEffect, useState } from 'react';
import DataTable, { TableProps } from 'react-data-table-component';

export type TListRow = Record<string, unknown>;

export type TListProps <TRow = TListRow> = {
  data: TableProps<TRow>['data'];
  columns: TableProps<TRow>['columns'];
}

export default function List ({ 
  data,
  columns,
}: TListProps) {
  const [ items, setItems ] = useState<TListRow[]>(data);

  const handleSort: TableProps<TListRow>['onSort'] = async (column, direction) => {
    console.log('sort', { column, direction });
    // setData(remoteData);
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <DataTable
      columns={columns}
      data={items}
      onSort={handleSort}
      sortServer
    />
  );
}