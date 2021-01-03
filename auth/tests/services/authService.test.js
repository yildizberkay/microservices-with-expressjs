import { initializeDatabase } from '../../src/db'
import { User } from '../../src/db/models'
import { getTokenFromEmailAndPassword, registerUser } from '../../src/services'
import { UserAlreadyExist, WrongLoginInfoException } from '../../src/exceptions'
import { getSaltHashPassword } from '../../src/utils/crypto'
import { sampleUser } from '../sampleData'

describe('authService', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  describe(('registration'), () => {
    beforeEach(async () => {
      await User.destroy({
        where: {},
        truncate: true
      })
    })

    test('register user', async () => {
      const result = await registerUser(sampleUser.name, sampleUser.email, sampleUser.password)
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: sampleUser.name,
        email: sampleUser.email
      }))
    })

    test('throw error if user is already registered', async () => {
      await registerUser(sampleUser.name, sampleUser.email, sampleUser.password)
      return expect(registerUser(sampleUser.name, sampleUser.email, sampleUser.password))
        .rejects.toMatchObject(new UserAlreadyExist())
    })
  })

  describe('verify user with email and password', () => {
    beforeAll(async () => {
      await User.destroy({
        where: {},
        truncate: true
      })
      // Create sample user
      const passObject = getSaltHashPassword(sampleUser.password)
      await User.create({
        name: sampleUser.name,
        email: sampleUser.email,
        password: passObject.passwordHash
      })
    })

    test('get token from email and password', async () => {
      const result = await getTokenFromEmailAndPassword(sampleUser.email, sampleUser.password)
      expect(result).toHaveProperty('token')
    })

    test('throw error if email is wrong', () => {
      return expect(getTokenFromEmailAndPassword('wrong@wrong.com', sampleUser.password))
        .rejects.toMatchObject(new WrongLoginInfoException())
    })

    test('throw error if password is wrong', () => {
      return expect(getTokenFromEmailAndPassword(sampleUser.email, '12345'))
        .rejects.toMatchObject(new WrongLoginInfoException())
    })
  })
})
