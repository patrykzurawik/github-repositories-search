import { Repo } from 'lib/octokit/types/repos';

import styles from './ColumnName.module.scss';

type TColumnNameProps = {
  row: Repo;
}

export default function ColumnName ({ row }: TColumnNameProps) {
  return (
    <div className={styles.ColumnName}>
      <a
        target="_blank"
        href={row.html_url}
        rel="noopener noreferrer"
        title={row.name}
        className={styles.Link}
      >
        {row.name}
      </a>

      <span className={styles.Tag}>
        {row.description}
      </span>
    </div>
  );
}