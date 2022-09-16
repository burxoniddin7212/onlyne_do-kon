

export class AuthorizatsionError extends Error {
  constructor(status, message) {
    super()
    this.status = status,
      this.message = message,
      this.name = 'AuthorizatsionError'
  }
}

export class ForbiddineError extends Error {
  constructor(status, message) {
    super()
    this.status = status,
      this.message = message,
      this.name = 'ForbiddineError'
  }
}

export class InternalServerError extends Error {
  constructor(status, message) {
    super()
    this.status = status,
      this.message = message,
      this.name = 'InternalServerError'
  }
}