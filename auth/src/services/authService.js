import { getJWTToken, getSaltHashPassword, verifyPassword } from '../utils/crypto'
import { User } from '../db/models'
import { UserAlreadyExist, WrongLoginInfoException } from '../exceptions'

export const registerUser = async (name: string, email: string, password: string) => {
  const checkUser = await User.findOne({ where: { email } })
  if (checkUser) {
    throw new UserAlreadyExist()
  }

  const passObject = getSaltHashPassword(password)
  const userObject = User.build({
    name,
    email,
    password: passObject.passwordHash
  })

  await userObject.validate()
  await userObject.save()
  return {
    id: userObject.id,
    name: userObject.name,
    email: userObject.email
  }
}

export const getTokenFromEmailAndPassword = async (email: string, password: string) => {
  const userObject = await User.findOne({ where: { email } })
  if (!userObject) {
    throw new WrongLoginInfoException()
  }

  const isVerified = verifyPassword(password, userObject.password)
  if (isVerified) {
    return { token: getJWTToken({ id: userObject.id }) }
  } else {
    throw new WrongLoginInfoException()
  }
}
