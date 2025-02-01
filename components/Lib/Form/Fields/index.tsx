import { FormField as FormFieldType, FormFieldTypeEnum } from 'types/form/fields';

import FormFieldText from 'components/Lib/Form/Fields/FormFieldText';

export type FormFieldProps = {
  field: FormFieldType;
  error: string | undefined;
}

export default function FormField ({
  field,
  error,
}: FormFieldProps) {

  const fieldToRender = ({
    [FormFieldTypeEnum.TEXT]: <FormFieldText field={field} error={error} />,
  }[field.type]);

  return (
    <div className="form-field-wrapper">
      {fieldToRender}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};