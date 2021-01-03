// @flow
import { NextFunction, Request, Response } from 'express'
import { passwordSalt } from '../utils/crypto'

const jwt = require('jsonwebtoken')

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization
  const token = authHeader && authHeader.split(' ')[1]

  jwt.verify(token, passwordSalt, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(401)
    }
    req.user = user
    next()
  })
}
