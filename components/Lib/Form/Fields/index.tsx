'use client';

import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { FormField as FormFieldType, FormFieldTypeEnum } from 'types/form/fields';

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
    <div className={styles.FormField}>
      {fieldToRender({ field, register, error })}
      {/*TODO: properly handle error message*/}
      {error && <p style={{ color: 'red' }}>{JSON.stringify(error.message)}</p>}
    </div>
  );
};