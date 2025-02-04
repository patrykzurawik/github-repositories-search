import { FaRegStar } from 'react-icons/fa';
import { useLocale } from 'next-intl';
import { Repo } from 'lib/octokit/types/repos';

import styles from 'components/SearchList/Columns/Stars/ColumnStars.module.scss';

type TColumnStarsProps = {
  row: Repo;
}

export default function ColumnStars ({ row }: TColumnStarsProps) {
  const locale = useLocale();

  return (
    <span className={styles.ColumnStars}>
      <FaRegStar />
      {Number(row.stargazers_count).toLocaleString(locale)}
    </span>
  );
}