import supertest from 'supertest'
import { initializeDatabase } from '../src/db'
import { createTicket } from '../src/services'
import { Ticket } from '../src/db/models'
import { sampleTicket } from './sampleData'

const app = require('../src/server')

describe('ticket endpoints', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  describe('get', () => {
    let sampleTicketId

    beforeAll(async () => {
      // Crate a sample ticket
      const ticket = await createTicket(sampleTicket.title, sampleTicket.content, sampleTicket.userId)
      sampleTicketId = ticket.id
    })

    test('get all tickets', async () => {
      const res = await supertest(app).get('/').set('User-Id', sampleTicket.userId)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('tickets')
      expect(res.body.tickets.length).toStrictEqual(1)
    })

    test('get all tickets - gives error if user is not provided', async () => {
      const res = await supertest(app).get('/')

      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error.name).toEqual('UserIdShouldProvided')
    })

    test('get a ticket', async () => {
      const res = await supertest(app).get(`/${sampleTicketId}`).set('User-Id', sampleTicket.userId)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('ticket')
      expect(res.body.ticket).toEqual(expect.objectContaining(sampleTicket))
    })

    test('get a ticket - gives error if user is not provided', async () => {
      const res = await supertest(app).get(`/${sampleTicketId}`)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error.name).toEqual('UserIdShouldProvided')
    })
  })

  describe('post', () => {
    beforeEach(async () => {
      await Ticket.destroy({
        where: {},
        truncate: true
      })
    })

    test('create ticket', async () => {
      const res = await supertest(app)
        .post('/')
        .set({ 'User-Id': sampleTicket.userId })
        .send(sampleTicket)

      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('result')
      expect(res.body).toHaveProperty('ticket')
      expect(res.body.ticket).toEqual(expect.objectContaining(sampleTicket))
    })

    test('gives error if user id is not provided', async () => {
      const res = await supertest(app)
        .post('/')
        .send(sampleTicket)

      expect(res.statusCode).toEqual(500)
    })

    test('gives error if user id and payload are not provided', async () => {
      const res = await supertest(app)
        .post('/')

      expect(res.statusCode).toEqual(500)
    })
  })
})
