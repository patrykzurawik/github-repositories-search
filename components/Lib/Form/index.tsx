'use client';

import { startTransition, useActionState } from 'react';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { search } from 'actions/search';
import { FormField as FormFieldType } from 'types/form/fields';
import { FormState } from 'types/form/state';
import { ZodSchema } from 'zod';

import FormField from 'components/Lib/Form/Fields';

type FormProps = {
  fields: FormFieldType[];
  schema: ZodSchema;
}

export default function Form ({
  fields,
  schema,
}: FormProps) {
  const t = useTranslations();
  const [ state, action, isPending ] = useActionState<FormState, FormData>(search, { isError: false });

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FieldValues) => {
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, value));

    startTransition(() =>
      action(form));
  };

  if (state.isError && state.errors) {
    Object.entries(state.errors).forEach(([field, message]) => {
      setError(field as Path<FieldValues>, { message });
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      { fields.map((field, key) =>
        <FormField
          key={key}
          field={field}
          register={register}
          // TODO: check type
          errors={errors}
        />
      ) }

      <button disabled={isPending}>{t('CTA.search')}</button>

      <br />
      <br />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
};