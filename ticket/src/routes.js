// @flow
import express from 'express'
import { resultCodes } from './enums'
import { createTicket, getTicket } from './services'

const ticketRoute = express.Router()

ticketRoute.get('/', function (req, res, next) {
  const userId = req.headers['user-id']
  getTicket(userId)
    .then((tickets) => res.json({ result: resultCodes.SUCCESS, tickets }))
    .catch(next)
})

ticketRoute.get('/:id', function (req, res, next) {
  const userId = req.headers['user-id']
  getTicket(userId, req.params.id)
    .then((ticket) => res.json({ result: resultCodes.SUCCESS, ticket }))
    .catch(next)
})

ticketRoute.post('/', function (req, res, next) {
  const { title, content } = req.body
  const userId = req.headers['user-id']

  createTicket(title, content, userId)
    .then((ticket) => res.status(201).json({ result: resultCodes.SUCCESS, ticket }))
    .catch(next)
})

export { ticketRoute }
