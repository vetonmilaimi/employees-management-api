import { ExpressJoiError } from 'express-joi-validation'
import { ValidationError } from 'joi'

export class BaseError extends Error {
  public error: boolean = true
  public name: string = 'employees-management-api-error'
  public message: string = 'Server Error'
  public statusCode: number = 400
  public details: unknown
}

export class InternalServerError extends BaseError {
  name = 'internal-server-error'
  statusCode = 400

  constructor() {
    super()
  }
}

export class JoiError extends BaseError {
  name = 'validation-error'
  message = 'Validation error.'
  statusCode = 400

  constructor(joiError: ExpressJoiError | ValidationError) {
    super()
    const details = (joiError as ExpressJoiError)?.error?.details
      ? (joiError as ExpressJoiError)?.error?.details
      : (joiError as ValidationError)?.details
    this.details = { validation_errors: details }
  }
}

export class RouteNotFoundError extends BaseError {
  name = 'route-not-found-error'
  message = 'This route could not be found!'
  statusCode = 404
  path: string

  constructor(path: string) {
    super()
    this.path = path
  }
}

export class InvalidTimeString extends BaseError {
  name = 'invalid-time-string'
  message = 'Invalid time string'
  statusCode = 400

  constructor() {
    super()
  }
}

export class FailedHttpRequest extends BaseError {
  name = 'failed-http-request'
  message = 'Failed Http Request'
  statusCode = 400

  constructor() {
    super()
  }
}

export class LoginError extends BaseError {
  name = 'login-error'
  message = 'Email/Password is incorrect!'
  statusCode = 400

  constructor() {
    super()
  }
}
