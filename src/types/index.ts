export interface ResponseForm<T> {
  isSuccess: true;
  data: T;
}

export type Try<T> = ResponseForm<T>;

export function createResponseForm<T>(data: T): Try<T> {
  return {
    isSuccess: true,
    data,
  } as const;
}
