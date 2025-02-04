import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { clsx } from 'clsx';
import LogoImage from 'public/logo.svg';

import styles from './Logo.module.scss';

type TLogoProps = {
  isAlternative?: boolean;
}

export default async function Logo ({ isAlternative }: TLogoProps) {
  const t = await getTranslations('SearchRepos');
  
  return (
    <Link href="/" className={styles.Link}>
      <section className={clsx(styles.Logo, isAlternative && styles.Alternative)}>
        <Image
          src={LogoImage}
          alt={t('title')}
          className={styles.Image}
        />
        <h1 className={styles.Name}>
          {t('title')}
        </h1>
      </section>
    </Link>
  );
}