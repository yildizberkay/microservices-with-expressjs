import express from 'express'
import { ticketRoute } from './routes'
import bodyParser from 'body-parser'
import { globalErrorHandler } from './middlewares'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use(ticketRoute)
app.use(globalErrorHandler)

module.exports = app
