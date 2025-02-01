import { FormFieldText as FormFieldTextType } from 'types/form/fields';

import { FormFieldProps } from 'components/Lib/Form/Fields/index';

type FormFieldTextProps = FormFieldProps & {
  field: FormFieldTextType;
}

export default function FormFieldText ({
  field,
  error,
}: FormFieldTextProps) {
  const isError = Boolean(error);

  return (
    <>
      <input
        name={field.name}
        type='text'
        aria-label={field.label}
        aria-invalid={isError}
        {...isError
          ? { 'aria-describedby': error }
          : null
        }
      />


    </>
  );
}