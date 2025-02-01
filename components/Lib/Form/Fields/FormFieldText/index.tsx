import { FormFieldText as FormFieldTextType } from 'types/form/fields';

import { FormFieldProps } from 'components/Lib/Form/Fields/index';

type FormFieldTextProps = FormFieldProps & {
  field: FormFieldTextType;
}

export default function FormFieldText ({
  field,
  register,
  errors,
}: FormFieldTextProps) {
  const errorMessage = errors?.[field.name]?.message;
  const isError = Boolean(errorMessage?.length);

  return (
    <>
      <input
        type='text'
        aria-label={field.label}
        aria-invalid={isError}
        {...isError
          ? { 'aria-describedby': errorMessage }
          : null
        }
        {...register(field.name)}
      />

      {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]?.message}</p>}
    </>
  );
}