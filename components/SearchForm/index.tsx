'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { ROUTE_SEARCH } from 'constants/routes';
import { FormField, FormFieldTypeEnum } from 'types/form/fields';
import { FormStateSuccess } from 'types/form/state';
import { ReposSearchQueryParams } from 'types/repos';
import { getSearchSchema, validateUnsafeSearchQueryParams } from 'validators/search';

import Form from 'components/Lib/Form';

import styles from './SearchForm.module.scss';

type TSearchFormProps = {
  className?: string;
}

export default function SearchForm ({ className }: TSearchFormProps) {
  const router = useRouter();
  const unsafeSearchParams = useSearchParams();
  const t = useTranslations();

  const fields: FormField[] = [
    {
      type: FormFieldTypeEnum.TEXT,
      name: 'q',
      label: t('SearchRepos.queryLabel'),
      placeholder: t('SearchRepos.queryLabel'),
    },
  ];
  
  const schema = getSearchSchema(t);
  
  const onSuccess = (formState: FormStateSuccess<ReposSearchQueryParams>) => {
    router.push(ROUTE_SEARCH(formState.data));
  };

  const { isSuccess, data: params } = validateUnsafeSearchQueryParams(Object.fromEntries(unsafeSearchParams.entries()), t);

  let defaultValues: Partial<ReposSearchQueryParams> = {};
  if (isSuccess && params)
    defaultValues = params;

  return (
    <Form
      fields={fields}
      schema={schema}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      className={clsx(styles.SearchForm, className)}
    />
  );
}