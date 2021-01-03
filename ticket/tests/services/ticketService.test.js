import { initializeDatabase } from '../../src/db'
import { Ticket } from '../../src/db/models'
import { sampleTicket } from '../sampleData'
import { createTicket, getTicket } from '../../src/services'
import { UserIdShouldProvided } from '../../src/exceptions/UserIdShouldProvided'

describe('ticketService', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  beforeEach(async () => {
    await Ticket.destroy({
      where: {},
      truncate: true
    })
  })

  describe('get', () => {
    let ticket
    beforeEach(async () => {
      ticket = await Ticket.create(sampleTicket)
    })

    test('byId', async () => {
      return expect(getTicket(ticket.userId, ticket.id)).resolves.toEqual(expect.objectContaining(sampleTicket))
    })

    test('all', async () => {
      return expect(getTicket(ticket.userId)).resolves.toEqual(expect.arrayContaining([
        expect.objectContaining(sampleTicket)
      ]))
    })

    test('should throw error if user is not provided', () => {
      return expect(getTicket(null, ticket.id)).rejects.toMatchObject(new UserIdShouldProvided())
    })
  })

  test('create ticket', () => {
    return expect(createTicket(sampleTicket.title, sampleTicket.content, sampleTicket.userId))
      .resolves
      .toEqual(expect.objectContaining(sampleTicket))
  })

  test('gives error if parameters are not provided while creating ticket', () => {
    return expect(createTicket())
      .rejects
      .toEqual(expect.any(Error))
  })
})
