import { DEFAULT_SEARCH_PARAMS_ORDER } from 'constants/search';
import { sortQueryParams } from 'lib/octokit/helpers/formatters/url';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

export const ROUTE_SEARCH = (params: ReposSearchQueryParams) => {
  const { isSuccess, data } = validateUnsafeSearchQueryParams(params);

  if (!isSuccess) {
    throw new Error('Wrong URL');
  }

  const sortedData = sortQueryParams<ReposSearchQueryParams>(
    data,
    DEFAULT_SEARCH_PARAMS_ORDER
  );

  return `/?${new URLSearchParams(sortedData).toString()}`;
};