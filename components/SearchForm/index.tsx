'use client';

import { useTranslations } from 'next-intl';
import { FormField, FormFieldTypeEnum } from 'types/form/fields';
import { getSearchSchema } from 'validators/search';

import Form from 'components/Lib/Form';

export default function SearchForm () {
  const fields: FormField[] = [
    { type: FormFieldTypeEnum.TEXT, name: 'q', label: 'Type repository name...' },
  ];

  const t = useTranslations();
  const schema = getSearchSchema(t);

  return (
    <Form
      fields={fields}
      schema={schema}
    />
  );
}