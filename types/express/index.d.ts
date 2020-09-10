import 'express'

declare global {
  namespace Express {
    interface Request {
      authToken: string
      userId: string
      token: string
    }
  }
}
