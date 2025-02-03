import { Mona_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import ParticlesBackground from 'components/ParticlesBackground';

import 'styles/globals.scss';
import styles from './layout.module.scss';

const MonaSanse = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={MonaSanse.variable}>
        <NextIntlClientProvider messages={messages}>
          <main className={styles.Wrapper}>
            {children}
            <ParticlesBackground />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
