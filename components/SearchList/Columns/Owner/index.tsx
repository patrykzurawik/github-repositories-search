import Image from 'next/image';
import { Repo } from 'lib/octokit/types/repos';

import styles from './ColumnOwner.module.scss';

type TColumnOwnerProps = {
  row: Repo;
}

export default function ColumnOwner ({ row }: TColumnOwnerProps) {
  return (
    <div className={styles.ColumnOwner}>
      { row.owner?.avatar_url &&
          <Image 
            src={row.owner?.avatar_url}
            alt={'Avatar'}
            fill
            className={styles.Image}
          />
      }
      <a
        href={row.owner?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        title={row.owner?.login}
        className={styles.Link}
      >
        {row.owner?.login}
      </a>
    </div>
  );
}