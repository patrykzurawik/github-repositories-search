'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { FormField as FormFieldType } from 'types/form/fields';
import { FormState } from 'types/form/state';

import FormField from 'components/Lib/Form/Fields';

type FormProps = {
  fields: FormFieldType[];
  serverAction: () => Promise<FormState>
}

export default function Form ({
  fields,
  serverAction,
}: FormProps) {
  const t = useTranslations();
  const [ state, action, isPending ] = useActionState<FormState, FormData>(serverAction, { isError: false });

  const getFieldError = (field: FormFieldType) =>
    state.errors?.[field.name];
  
  return (
    <form action={action}>
      { fields.map((field, key) =>
        <FormField
          key={key}
          field={field}
          error={getFieldError(field)}
        />
      ) }

      <button disabled={isPending}>{t('CTA.search')}</button>

      <br />
      <br />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
};