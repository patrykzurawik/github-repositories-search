export const enum FormFieldTypeEnum {
  'TEXT' = 'text',
}

export type FormFieldBase = {
  type: FormFieldTypeEnum,
  name: string;
  label: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
}

export type FormFieldText = FormFieldBase & {
  type: FormFieldTypeEnum.TEXT;
}

export type FormField = FormFieldText;