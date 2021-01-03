import { NextFunction, Request, Response } from 'express'
import { resultCodes } from '../enums'

export const globalErrorHandler = async (error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    let statusCode = 500
    if (error?.httpStatusCode) {
      statusCode = error.httpStatusCode
    }

    res.status(statusCode).json({
      result: resultCodes.ERROR,
      error: {
        name: error.name,
        message: error.message
      }
    })
  } else {
    next()
  }
}
