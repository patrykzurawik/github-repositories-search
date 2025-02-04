'use client';

import DataTable, { TableProps } from 'react-data-table-component';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

import NoData from 'components/Lib/List/NoData';
import Spinner from 'components/Lib/Spinner';

import { getTheme, styles as customStyles } from './theme';

import styles from './List.module.scss';

getTheme();

// TODO: fix type
// eslint-disable-next-line
export type TListRow = Record<string, unknown> & any;

export type TListProps <TRow = TListRow> =
  Pick<TableProps<TRow>,
    'onChangePage'
    | 'onChangeRowsPerPage'
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
  children?: React.ReactNode;
  className?: string;
}

export default function List ({ 
  data,
  columns,
  isLoading,

  onChangePage,
  onChangeRowsPerPage,
  paginationTotalRows,
  paginationDefaultPage,
  paginationPerPage = 20,
  paginationRowsPerPageOptions = [ 10, 20, 50, 100 ],

  onSort,
  children,
  className,
}: TListProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(styles.List, className)}
      data-ta='List'
    >
      {children}

      <DataTable
        columns={columns}
        data={data}
        progressPending={isLoading}
        progressComponent={<Spinner />}
        noDataComponent={paginationTotalRows === 0 ? <NoData /> : null}

        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        pagination
        paginationServer
        paginationTotalRows={paginationTotalRows}
        paginationDefaultPage={Number(paginationDefaultPage)}
        paginationPerPage={Number(paginationPerPage)}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationComponentOptions={{
          rowsPerPageText: t('List.pagination.rowsPerPage'),
          rangeSeparatorText: t('List.pagination.rangeSeparator'),
        }}

        striped
        theme='ghs'
        customStyles={customStyles}

        { ...onSort
          ? { onSort, sortServer: true }
          : null
        }
      />
    </div>
  );
}
