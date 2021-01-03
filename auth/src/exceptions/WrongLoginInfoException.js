export class WrongLoginInfoException extends Error {
  constructor (message) {
    super(message)
    this.name = 'WrongLoginInfoException'
  }
}
