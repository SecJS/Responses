export interface IResponseBuilder<TData = any> {
  status?: 'success' | 'error'
  message?: string
  data?: TData[] | TData | object
  error?: IError
}

export interface IError {
  code?: string
  httpStatus?: number
  validation?: IValidation
  stack?: any
}

export interface IValidation {
  message: string
  field: string
  validation: string
}

export interface ISecResponse {
  withCollection<TData = any>(dataObj: Array<TData>, message?: string): void
  withOne(dataObj: object, message?: string): void
  withCreated(dataObj: object, message?: string): void
  withUpdated(dataObj: object, message?: string): void
  withDeleted(message?: string): void
  withoutBody(message?: string): void
  withError(
    dataObj?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
    exception?: any,
  ): void
  withValidationError(
    dataObj?: any,
    validation?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
  ): void
}
