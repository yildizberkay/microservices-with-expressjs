export class UserAlreadyExist extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserAlreadyExist'
    this.httpStatusCode = 402
  }
}
