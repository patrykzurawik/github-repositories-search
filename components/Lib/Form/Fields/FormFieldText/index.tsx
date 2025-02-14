'use client';

import { FieldError } from 'react-hook-form';
import { LocatorFormFieldText } from 'constants/locators';
import { FormFieldText as FormFieldTextType } from 'types/form/fields';

import { FormFieldProps } from 'components/Lib/Form/Fields/index';

import styles from './FormFieldText.module.scss';

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
      placeholder={field.placeholder}
      aria-label={field.label}
      aria-invalid={isError}
      aria-describedby={isError
        ? error?.message ?? ''
        : field.label
      }
      {...register(field.name)}
      disabled={field.disabled}
      autoFocus={field.autofocus}
      className={styles.Input}
      data-ta={LocatorFormFieldText}
    />
  );
}