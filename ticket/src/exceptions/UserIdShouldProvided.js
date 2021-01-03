export class UserIdShouldProvided extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserIdShouldProvided'
    this.httpStatusCode = 400
  }
}
