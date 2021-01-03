import { initializeDatabase } from '../../src/db'
import { getUserById } from '../../src/services'
import { UserNotFound } from '../../src/exceptions'
import { User } from '../../src/db/models'
import { sampleUser } from '../sampleData'

describe('userService', () => {
  let id

  beforeAll(async () => {
    await initializeDatabase()

    // Create sample user
    const user = await User.create(sampleUser)
    id = user.id
  })

  test('get user by id', async () => {
    const result = await getUserById(1)
    expect(result).toStrictEqual({
      id: id,
      name: sampleUser.name,
      email: sampleUser.email
    })
  })

  test('throw error if user doesn\'t exist', async () => {
    return expect(getUserById(99)).rejects.toMatchObject(new UserNotFound())
  })
})
