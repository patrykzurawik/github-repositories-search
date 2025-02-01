import { useTranslations } from 'next-intl';
import { z } from 'zod';

// TODO: check types
export const getSearchSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  q: z
    .string(t('Validators.string'))
    .min(3, t('Validators.min', { value: 3 }))
    .max(256, t('Validators.string', { value: 256 })),
});
