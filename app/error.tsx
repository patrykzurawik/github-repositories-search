'use client';

import ErrorMessage from 'components/Lib/ErrorMessage';

export default function Error ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorMessage error={error} reset={reset} />;
}