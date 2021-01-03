// @flow
import express from 'express'
import { getTokenFromEmailAndPassword, getUserById, registerUser } from './services'
import { resultCodes } from './enums'
import { authHandler } from './middlewares'

const authRoute = express.Router()

authRoute.get('/check-token', authHandler, function (req, res) {
  res.setHeader('User-Id', req.user.id)
  res.sendStatus(200)
})

authRoute.get('/me', authHandler, function (req, res, next) {
  getUserById(req.user.id)
    .then(user => res.json({ result: resultCodes.SUCCESS, user }))
    .catch(next)
})

authRoute.post('/register', async function (req, res, next) {
  const { name, email, password } = req.body
  registerUser(name, email, password)
    .then(() => res.status(201).json({ result: resultCodes.SUCCESS }))
    .catch(next)
})

authRoute.post('/login', async function (req, res, next) {
  const { email, password } = req.body
  await getTokenFromEmailAndPassword(email, password)
    .then((data) => res.json({ result: resultCodes.SUCCESS, data }))
    .catch(next)
})

export { authRoute }
