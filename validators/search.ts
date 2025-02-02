import { ReadonlyURLSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormState } from 'types/form/state';
import { ReposSearchQueryParams } from 'types/repos';
import { z } from 'zod';

export const getSearchSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  q: z
    // TODO: restore custom message
    // .string(t('Validators.string'))
    .string()
    .min(3, t('Validators.min', { value: 3 }))
    .max(256, t('Validators.string', { value: 256 })),
  sort: z
    .string(),
  // .nullish(),
  order: z
    .string(),
  // .nullish(),
});

export const validateUnsafeSearchParams = 
  (unsafeSearchParams: ReadonlyURLSearchParams, t: ReturnType<typeof useTranslations>): FormState<ReposSearchQueryParams> => {
    const paramsAsObject = Object.fromEntries(unsafeSearchParams.entries());

    const { success, data } = getSearchSchema(t).safeParse(paramsAsObject);

    return success  
      ? { isSuccess: true, data }
      : { isError: true };
  };
