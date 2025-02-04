import { useLocale } from 'next-intl';
import { Repo } from 'lib/octokit/types/repos';

type TColumnStarsProps = {
  row: Repo;
}

export default function ColumnCreated ({ row }: TColumnStarsProps) {
  const locale = useLocale();

  return (
    <span>
      {new Date(row.created_at).toLocaleDateString(locale)}
    </span>
  );
}