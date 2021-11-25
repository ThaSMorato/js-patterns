export class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} as called without an implementations`);

    this.name = "NotImplementedException";
  }
}
