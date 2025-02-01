import type { Metadata } from 'next';
import { Mona_Sans } from 'next/font/google';

import styles from '@/app/layout.module.css';

import './globals.css';

const MonaSanse = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'GitHub Search',
  description: 'Discover & Explore GitHub repos. Your gateway to the vast world of open-source code.',
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MonaSanse.variable}>
        <main className={styles.wrapper}>
          <h1>GitHub Search</h1>

          {children}
        </main>
      </body>
    </html>
  );
}
