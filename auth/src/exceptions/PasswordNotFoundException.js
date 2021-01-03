export class PasswordNotFoundException extends Error {
  constructor (message) {
    super(message)
    this.name = 'PasswordNotFoundException'
    this.httpStatusCode = 401
  }
}
