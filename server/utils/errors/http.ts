import { BaseError } from './base'

export class HttpError extends BaseError {
  public name = 'HttpError'
}

export class BadRequest extends HttpError {
  public name = 'BadRequest'
  public readonly status = 400
}

export class Unauthorized extends HttpError {
  public name = 'Unauthorized'
  public readonly status = 401
}

export class PaymentRequired extends HttpError {
  public name = 'PaymentRequired'
  public readonly status = 402
}

export class Forbidden extends HttpError {
  public name = 'Forbidden'
  public readonly status = 403
}

export class NotFound extends HttpError {
  public name = 'NotFound'
  public readonly status = 404
}

export class Conflict extends HttpError {
  public name = 'Conflict'
  public readonly status = 409
}

export class InternalServerError extends HttpError {
  public name = 'InternalServerError'
  public readonly status = 500
}

export const makeHttpError = (status?: number, message?: string): HttpError => {
  switch (status) {
    case 400:
      return new BadRequest(message)
    case 401:
      return new Unauthorized(message)
    case 402:
      return new PaymentRequired(message)
    case 403:
      return new Forbidden(message)
    case 404:
      return new NotFound(message)
    case 409:
      return new Conflict(message)
    case 500:
      return new InternalServerError(message)
  }
  return new HttpError(message)
}
