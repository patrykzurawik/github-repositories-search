export const sortQueryParams = <TParams = Record<string, unknown>> (params: TParams, order: (keyof TParams)[]): Record<keyof TParams, string> =>
  Object.fromEntries(
    order.reduce((acc, key) => {
      acc.set(key, params[key]);
      return acc;
    }, new Map())
  );