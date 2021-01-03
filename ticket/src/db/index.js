import { connection } from './config'
import { Ticket } from './models'

export const initializeDatabase = async () => {
  try {
    await connection.authenticate()
    await Ticket.sync({})

    console.log('Connection has been established and models synced successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
