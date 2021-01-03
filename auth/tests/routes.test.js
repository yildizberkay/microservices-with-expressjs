import supertest from 'supertest'
import { initializeDatabase } from '../src/db'
import { User } from '../src/db/models'
import { getTokenFromEmailAndPassword, registerUser } from '../src/services'
import { sampleUser } from './sampleData'

const app = require('../src/server')

describe('auth Endpoints', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  describe('auth required tests', () => {
    let token
    beforeAll(async () => {
      await registerUser(sampleUser.name, sampleUser.email, sampleUser.password)
      const loginResult = await getTokenFromEmailAndPassword(sampleUser.email, sampleUser.password)
      token = loginResult.token
    })

    test('check token', async () => {
      const res = await supertest(app)
        .get('/check-token')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.statusCode).toEqual(200)
    })

    test('should give 401 if token is wrong while checking token', async () => {
      const res = await supertest(app)
        .get('/check-token')
        .set({ Authorization: 'Bearer WrongToken' })
      expect(res.statusCode).toEqual(401)
    })

    test('should give 401 if token is not set while checking token', async () => {
      const res = await supertest(app)
        .get('/check-token')
      expect(res.statusCode).toEqual(401)
    })

    test('me', async () => {
      const res = await supertest(app)
        .get('/me')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('result')
      expect(res.body).toHaveProperty('user')
    })

    test('should give 401 if token is wrong on /me', async () => {
      const res = await supertest(app)
        .get('/me')
        .set({ Authorization: 'Bearer WrongToken' })
      expect(res.statusCode).toEqual(401)
    })

    test('should give 401 if token is not set on /me', async () => {
      const res = await supertest(app)
        .get('/me')
      expect(res.statusCode).toEqual(401)
    })
  })

  describe('register and login tests', () => {
    beforeEach(async () => {
      await User.destroy({
        where: {},
        truncate: true
      })
    })

    test('register new user', async () => {
      const res = await supertest(app)
        .post('/register')
        .send(sampleUser)

      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('result')
    })

    test('should give error if user registered already', async () => {
      await registerUser(sampleUser.name, sampleUser.email, sampleUser.password)
      const res = await supertest(app)
        .post('/register')
        .send(sampleUser)

      expect(res.statusCode).toEqual(402)
      expect(res.body).toHaveProperty('result')
    })
  })
})
