import { NextFunction, Request, Response } from 'express'
import { BaseError } from '../utils/exceptions'
import BaseResponse from '../utils/BaseResponse'

export const errorMiddleware = (error: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  return BaseResponse(res).error(error)
}

export const routeNotFoundMiddleware = (_req: Request, res: Response) => {
  return BaseResponse(res).routeNotFound()
}
