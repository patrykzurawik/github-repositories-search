import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { FormField as FormFieldType, FormFieldTypeEnum } from 'types/form/fields';

import FormFieldText from 'components/Lib/Form/Fields/FormFieldText';

export type FormFieldProps = {
  field: FormFieldType;
  errors: Record<FormFieldType['name'], FieldError>;
  register: UseFormRegister<FieldValues>;
}

export default function FormField ({
  field,
  errors,
  register,
}: FormFieldProps) {

  const fieldToRender = ({
    [FormFieldTypeEnum.TEXT]: <FormFieldText field={field} register={register} errors={errors} />,
  }[field.type]);

  return (
    <div className="form-field-wrapper">
      {fieldToRender}
    </div>
  );
};