export type FormStateSuccess<TSuccessData = Record<string, unknown>> = {
  isSuccess: true;
  isError?: never;
  data: TSuccessData;
};

export type FormStateError<TErrorData = Record<string, unknown>> = {
  isError: true;
  isSuccess?: never;
  data?: TErrorData;
};

export type FormState<TSuccessData = Record<string, unknown>, TErrorData = Record<string, unknown>> =
  FormStateSuccess<TSuccessData>
  | FormStateError<TErrorData>