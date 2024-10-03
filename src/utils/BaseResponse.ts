import { Response } from 'express'
import { BaseError, InternalServerError, JoiError, RouteNotFoundError } from './exceptions'

import { ExpressJoiError } from 'express-joi-validation'

class BaseResponse {
  private response: Response
  constructor(response: Response) {
    this.response = response
  }

  private handleError(err: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    let errOccurred
    if (err instanceof BaseError) {
      errOccurred = err
    } else if ((err as ExpressJoiError)?.error?.isJoi) {
      errOccurred = new JoiError(err as ExpressJoiError)
    } else {
      errOccurred = new InternalServerError()
    }
    return this.response.status(errOccurred?.statusCode).json(errOccurred)
  }

  public success(body: object | string | number | boolean | null) {
    this.response.status(200).json({
      error: false,
      message: body,
    })
  }

  public error(err: unknown) {
    this.handleError(err)
  }

  public routeNotFound() {
    const err = new RouteNotFoundError(this?.response?.req?.originalUrl || '')
    this.handleError(err)
  }
}

export default (response: Response) => new BaseResponse(response)
