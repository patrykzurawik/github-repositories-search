'use client';

import { FieldError } from 'react-hook-form';
import { FormFieldText as FormFieldTextType } from 'types/form/fields';

import { FormFieldProps } from 'components/Lib/Form/Fields/index';

type FormFieldTextProps = Pick<FormFieldProps, 'register'> & {
  field: FormFieldTextType;
  error: FieldError;
}

export default function FormFieldText ({
  field,
  register,
  error,
}: FormFieldTextProps) {
  const isError = Boolean(error?.message?.length);

  return (
    <input
      type='text'
      aria-label={field.label}
      aria-invalid={isError}
      aria-describedby={isError
        ? error?.message ?? ''
        : field.label
      }
      {...register(field.name)}
    />
  );
}