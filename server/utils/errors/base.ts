export class BaseError extends Error {
  public name = 'BaseError'
  public constructor(message?: string) {
    super(message)
  }
  public toString(): string {
    return `${this.name}: ${this.message}`
  }
}
