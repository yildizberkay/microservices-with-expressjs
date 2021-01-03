import express from 'express'
import { authRoute } from './routes'
import bodyParser from 'body-parser'
import { globalErrorHandler } from './middlewares'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use(authRoute)
app.use(globalErrorHandler)

module.exports = app
