'use client';

import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { LocatorForm } from 'constants/locators';
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
  isLoading?: boolean;
  className?: string;
}

export default function Form ({
  fields,
  schema,
  onSuccess,
  defaultValues,
  isLoading,
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
      className={clsx(styles.Wrapper, !formState.isValid && 'invalid', className)}
      data-ta={LocatorForm}
    >
      { fields.map((field, key) =>
        <FormField
          key={key}
          field={{ ...field, disabled: isLoading }}
          register={register}
          errors={formState.errors}
        />
      ) }

      <ButtonPrimary
        type='submit'
        aria-label={t('CTA.search')}
        className={styles.SubmitButton}
        disabled={isLoading}
      >
        <FaSearch />
      </ButtonPrimary>
    </form>
  );
};