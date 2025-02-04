'use client';

import { useLocale, useTranslations } from 'next-intl';

import { TListProps } from 'components/Lib/List/index';

import styles from './ItemsCount.module.scss';

type TItemsCountProps = {
  totalRows: TListProps['paginationTotalRows'];
}

export default function ItemsCount ({ totalRows }: TItemsCountProps) {
  const locale = useLocale();
  const t = useTranslations();
  const value = Number(totalRows).toLocaleString(locale);
  
  return (
    <span className={styles.ItemsCount}>
      {t.rich(
        'List.itemsCountMessage',
        {
          value: () => <strong>{value}</strong>,
        }
      )}
    </span>
  );
}