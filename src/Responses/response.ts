import { ResponseBuilder } from './builder'
import { ISecResponse } from './types'

interface IResponse {
  json(data: any): void

  status(httpStatus: number): IResponse
}

export class SecResponse implements ISecResponse {
  private responseBuilder: ResponseBuilder

  constructor(private response: IResponse) {
    this.responseBuilder = new ResponseBuilder()
  }

  withCollection<TData = any>(dataObj: Array<TData>, message?: string): void {
    this.response.json(this.responseBuilder.withCollection(dataObj, message))
  }

  withOne(dataObj: object, message?: string): void {
    this.response.json(this.responseBuilder.withOne(dataObj, message))
  }

  withCreated(dataObj: object, message?: string): void {
    this.response
      .status(201)
      .json(this.responseBuilder.withCreated(dataObj, message))
  }

  withUpdated(dataObj: object, message?: string): void {
    this.response.json(this.responseBuilder.withUpdated(dataObj, message))
  }

  withDeleted(message?: string): void {
    this.response.json(this.responseBuilder.withDeleted(message))
  }

  withoutBody(message?: string): void {
    this.response.json(this.responseBuilder.withoutBody(message))
  }

  withError(
    dataObj?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
    exception?: any,
  ): void {
    const res = this.responseBuilder.withError(
      dataObj,
      message,
      code,
      httpStatus,
      exception,
    )

    if (httpStatus) {
      this.response.status(httpStatus).json(res)
    } else {
      this.response.json(res)
    }
  }

  withValidationError(
    dataObj?: any,
    validation?: any,
    message?: string,
    code?: string,
    httpStatus = 400,
  ): void {
    const res = this.responseBuilder.withValidationError(
      dataObj,
      validation,
      message,
      code,
      httpStatus,
    )

    if (httpStatus) {
      this.response.status(httpStatus).json(res)
    } else {
      this.response.json(res)
    }
  }
}
