export interface IBaseResponseModel<T> {
  data: T;
  total: number;
  skip: number;
  limit: number;
}
