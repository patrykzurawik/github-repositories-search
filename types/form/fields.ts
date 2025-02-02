export const enum FormFieldTypeEnum {
  'TEXT' = 'text',
}

export type FormFieldBase = {
  type: FormFieldTypeEnum,
  name: string;
  label: string;
}

export type FormFieldText = FormFieldBase & {
  type: FormFieldTypeEnum.TEXT;
}

export type FormField = FormFieldText;