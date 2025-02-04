import { useTranslations } from 'next-intl';
import { DEFAULT_SEARCH_PARAMS } from 'constants/search';
import { FormState } from 'types/form/state';
import { ReposSearchQueryParams } from 'types/repos';
import { z } from 'zod';

export const getSearchSchema = (t?: ReturnType<typeof useTranslations>) => z.object({
  q: z
    .string()
    .min(3, t?.('Validators.min', { value: 3 }))
    .max(256, t?.('Validators.max', { value: 256 })),
  sort: z
    .string()
    .optional(),
  order: z
    .string()
    .optional(),
  page: z
    .coerce
    .string()
    .optional(),
  per_page: z
    .coerce
    .string()
    .optional(),
});

export const validateUnsafeSearchQueryParams = 
  (unsafeSearchQueryParams: Partial<ReposSearchQueryParams>, t?: ReturnType<typeof useTranslations>): FormState<ReposSearchQueryParams> => {
    const { success, data } = getSearchSchema(t).safeParse({
      ...DEFAULT_SEARCH_PARAMS,
      ...unsafeSearchQueryParams,
    });

    if (!success) {
      return { isError: true };
    }

    return { isSuccess: true, data: data as ReposSearchQueryParams };
  };
