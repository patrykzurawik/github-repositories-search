import { FormField } from 'types/form/fields';

export type FormState = {
  isError: boolean;
  errors?: Record<FormField['name'], string>;
  data?: unknown;
}