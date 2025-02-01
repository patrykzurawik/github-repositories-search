import { search } from 'actions/search';
import { FormField, FormFieldTypeEnum } from 'types/form/fields';

import Form from 'components/Lib/Form';

export default function SearchForm () {
  const fields: FormField[] = [
    { type: FormFieldTypeEnum.TEXT, name: 'q', label: 'Type repository name...' },
  ];
  
  return (
    <Form
      fields={fields}
      // TODO: check type
      serverAction={search}
    />
  );
}