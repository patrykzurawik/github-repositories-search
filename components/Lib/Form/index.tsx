'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { FormField as FormFieldType } from 'types/form/fields';
import { FormStateSuccess } from 'types/form/state';
import { z, ZodSchema } from 'zod';

import ButtonPrimary from 'components/Lib/Button/Primary';
import FormField from 'components/Lib/Form/Fields';

import styles from './Form.module.scss';

type FormProps = {
  fields: FormFieldType[];
  schema: ZodSchema;
  onSuccess: (_formState: FormStateSuccess<z.infer<ZodSchema>>) => unknown;
  defaultValues?: Partial<z.infer<ZodSchema>>;
  className?: string;
}

export default function Form ({
  fields,
  schema,
  onSuccess,
  defaultValues,
  className,
}: FormProps) {
  const t = useTranslations();
  const {
    register,
    formState,
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues,
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (unsafeData: z.infer<typeof schema>) => {
    const { success, data } = schema.safeParse(unsafeData);
    
    if (success) {
      return onSuccess?.({ isSuccess: success, data });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(styles.Wrapper, className)}
    >
      { fields.map((field, key) =>
        <FormField
          key={key}
          field={field}
          register={register}
          errors={formState.errors}
        />
      ) }

      <ButtonPrimary
        type='submit'
        className={styles.SubmitButton}
      >
        {t('CTA.search')}
      </ButtonPrimary>
    </form>
  );
};