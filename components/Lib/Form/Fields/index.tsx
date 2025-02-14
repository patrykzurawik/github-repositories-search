'use client';

import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { clsx } from 'clsx';
import { LocatorFormFieldWrapper } from 'constants/locators';
import { FormField as FormFieldType, FormFieldTypeEnum } from 'types/form/fields';

import ErrorMessage from 'components/Lib/Form/Fields/ErrorMessage';
import FormFieldText from 'components/Lib/Form/Fields/FormFieldText';

import styles from './FormFields.module.scss';

export type FormFieldProps = {
  field: FormFieldType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function FormField ({
  field,
  errors,
  register,
}: FormFieldProps) {
  const error = errors?.[field.name] as FieldError;

  const fieldToRender = ({
    [FormFieldTypeEnum.TEXT]: FormFieldText,
  }[field.type]);

  return (
    <div
      className={styles.FormField}
      data-ta={clsx(LocatorFormFieldWrapper, field.name, field.type)}
    >
      {fieldToRender({ field, register, error })}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};