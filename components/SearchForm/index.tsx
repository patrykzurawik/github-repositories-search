'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { submit } from 'actions/searchRepos';
import { ROUTE_SEARCH } from 'constants/routes';
import { FormField, FormFieldTypeEnum } from 'types/form/fields';
import { FormStateSuccess } from 'types/form/state';
import { ReposSearchQueryParams } from 'types/repos';
import { getSearchSchema } from 'validators/search';

import Form from 'components/Lib/Form';

export default function SearchForm () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const fields: FormField[] = [
    { type: FormFieldTypeEnum.TEXT, name: 'q', label: t('SearchRepos.queryLabel') },
  ];
  
  const schema = getSearchSchema(t);
  
  const onSuccess = (formState: FormStateSuccess<ReposSearchQueryParams>) => {
    router.push(ROUTE_SEARCH(formState.data));
  };

  const paramsAsObject = Object.fromEntries(searchParams.entries());
  const { success, data } = schema.safeParse(paramsAsObject);

  let defaultValues: Partial<ReposSearchQueryParams> = {};

  if (success) {
    defaultValues = data;
  }

  return (
    <Form
      fields={fields}
      action={submit}
      schema={schema}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    />
  );
}