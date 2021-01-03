// @flow
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
export const passwordSalt = process.env?.JWT_SALT

const sha512 = function (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  /** Hashing algorithm sha512 */
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

export function getSaltHashPassword (password: string) {
  return sha512(password, passwordSalt)
}

export const verifyPassword = (password, hashedPassword) => {
  return sha512(password, passwordSalt).passwordHash === hashedPassword
}

export function getJWTToken (payload) {
  return jwt.sign(payload, passwordSalt, { expiresIn: '3y' })
}
