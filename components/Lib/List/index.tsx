'use client';

import DataTable, { TableProps } from 'react-data-table-component';
import { useTranslations } from 'next-intl';

import ItemsCount from 'components/Lib/List/ItemsCount';
import NoData from 'components/Lib/List/NoData';
import Spinner from 'components/Lib/Spinner';

import { getTheme, styles } from './theme';

getTheme();

// TODO: fix type
// eslint-disable-next-line
export type TListRow = Record<string, unknown> & any;

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
  paginationPerPage = 20,
  paginationRowsPerPageOptions = [ 10, 20, 50, 100 ],

  onSort,
  className,
}: TListProps) {
  const t = useTranslations();
  const totalRows = paginationTotalRows ?? 0;
  const isPending = isLoading || !Number.isSafeInteger(paginationTotalRows);
  
  return (
    <div className={className}>
      { totalRows > 0 && <ItemsCount totalRows={totalRows} /> }

      <DataTable
        columns={columns}
        data={data}
        progressPending={isPending}
        progressComponent={<Spinner />}
        noDataComponent={totalRows === 0 ?  <NoData /> : null}

        onChangePage={onChangePage}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={Number(paginationDefaultPage)}
        paginationPerPage={Number(paginationPerPage)}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationComponentOptions={{
          rowsPerPageText: t('List.pagination.rowsPerPage'),
          rangeSeparatorText: t('List.pagination.rangeSeparator'),
        }}

        striped
        theme='ghs'
        customStyles={styles}

        { ...onSort
          ? { onSort, sortServer: true }
          : null
        }
      />
    </div>
  );
}
