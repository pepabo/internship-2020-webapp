import { Request, Response, NextFunction } from 'express'
import * as errors from '../utils/errors'

export const errorHandler = (error: Error, _: Request, res: Response, __: NextFunction) => {
  const sendStatus = (status: number, message?: string) => {
    message ? res.status(status).json({ message }) : res.sendStatus(status)
  }
  switch (error.constructor) {
    case errors.BadRequest:
      return sendStatus(400, error.message)
    case errors.Unauthorized:
      return sendStatus(401, error.message)
    case errors.PaymentRequired:
      return sendStatus(402, error.message)
    case errors.Forbidden:
      return sendStatus(403, error.message)
    case errors.NotFound:
      return sendStatus(404, error.message)
    case errors.Conflict:
      return sendStatus(409, error.message)
    case errors.InternalServerError:
      return sendStatus(500, error.message)
    default:
      return sendStatus(500, error.message)
  }
}
