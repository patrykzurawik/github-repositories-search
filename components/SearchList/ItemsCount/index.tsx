'use client';

import { useLocale, useTranslations } from 'next-intl';
import { SEARCH_RESULTS_LIMIT } from 'constants/search';

import Alert from 'components/Lib/Alert';
import { TListProps } from 'components/Lib/List';

import styles from './ItemsCount.module.scss';

type TItemsCountProps = {
  totalRows: TListProps['paginationTotalRows'];
}

export default function ItemsCount ({ totalRows }: TItemsCountProps) {
  const locale = useLocale();
  const t = useTranslations();
  const value = Number(totalRows).toLocaleString(locale);
  
  return (
    <div className={styles.ItemsCount}>
      <span className={styles.Value}>
        {t.rich(
          'List.itemsCountMessage',
          {
            value: () => <strong>{value}</strong>,
          }
        )}
      </span>

      { 
        Number(totalRows) > SEARCH_RESULTS_LIMIT &&
          <Alert type='warning' className={styles.Alert}>
            {t('Results.list.limitMessage', { value: SEARCH_RESULTS_LIMIT })}
          </Alert>
      }
    </div>
  );
}