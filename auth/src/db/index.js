import { connection } from './config'
import { User } from './models'

export const initializeDatabase = async () => {
  try {
    await connection.authenticate()
    await User.sync({})

    console.log('Connection has been established and models synced successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
