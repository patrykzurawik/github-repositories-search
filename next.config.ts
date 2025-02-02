import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    // dynamicIO: true,
  },
};

export default withNextIntl(nextConfig);
