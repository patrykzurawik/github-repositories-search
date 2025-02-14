'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { LocatorSearchForm } from 'constants/locators';
import useSearch from 'hooks/useSearch';
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
  const unsafeSearchParams = useSearchParams();
  const t = useTranslations();
  const { isLoading, doSearch, error } = useSearch(unsafeSearchParams);

  const fields: FormField[] = [
    {
      type: FormFieldTypeEnum.TEXT,
      name: 'q',
      label: t('SearchRepos.queryLabel'),
      placeholder: t('SearchRepos.queryLabel'),
      autofocus: true,
    },
  ];
  
  const schema = getSearchSchema(t);
  
  const onSuccess = (formState: FormStateSuccess<ReposSearchQueryParams>) => {
    doSearch(formState.data, Boolean(error));
  };

  const { isSuccess, data: params } = validateUnsafeSearchQueryParams(Object.fromEntries(unsafeSearchParams.entries()), t);

  let defaultValues: Partial<ReposSearchQueryParams> = {};
  if (isSuccess && params)
    defaultValues = { q: params.q };

  return (
    <Form
      fields={fields}
      schema={schema}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      isLoading={isLoading}
      className={clsx(styles.SearchForm, className)}
      data-ta={LocatorSearchForm}
    />
  );
}