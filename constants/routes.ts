import { DEFAULT_SEARCH_PARAMS_ORDER } from 'constants/search';
import { sortQueryParams } from 'lib/octokit/helpers/formatters/url';
import { ReposSearchQueryParams } from 'types/repos';
import { validateUnsafeSearchQueryParams } from 'validators/search';

export const ROUTE_INDEX = () => '/';

export const ROUTE_SEARCH = (params: ReposSearchQueryParams) => {
  const { isSuccess, data } = validateUnsafeSearchQueryParams(params);

  console.log(123, data);

  if (!isSuccess) {
    throw new Error('Wrong URL');
  }

  const sortedData = sortQueryParams<ReposSearchQueryParams>(
    data,
    DEFAULT_SEARCH_PARAMS_ORDER
  );

  return `/search?${new URLSearchParams(sortedData).toString()}`;
};