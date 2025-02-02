'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField as FormFieldType } from 'types/form/fields';
import { FormState, FormStateSuccess } from 'types/form/state';
import { z, ZodSchema } from 'zod';

import FormField from 'components/Lib/Form/Fields';

type FormProps = {
  fields: FormFieldType[];
  schema: ZodSchema;
  action: (_values: z.infer<ZodSchema>) => Promise<FormState>;
  onSuccess: (_formState: FormStateSuccess<z.infer<ZodSchema>>) => unknown;
}

export default function Form ({
  fields,
  action,
  schema,
  onSuccess,
}: FormProps) {
  const t = useTranslations();
  const {
    register,
    formState,
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const formState = await action(values);
    
    if (formState.isSuccess) {
      return onSuccess?.(formState as FormStateSuccess);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      { fields.map((field, key) =>
        <FormField
          key={key}
          field={field}
          register={register}
          errors={formState.errors}
        />
      ) }

      <button type='submit'>{t('CTA.search')}</button>
    </form>
  );
};