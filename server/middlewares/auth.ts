import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import jwtSimple from 'jwt-simple'
import { jwtKey, jwtAlgo } from '../config/jwt'
import { SessionEntity } from '../entities/session'
import { authTokenCookieName } from '../config/express'
import { Request } from 'express'

export const getAuthToken = (req: Request) => {
  // Authorization Header からトークンを取り出す
  const parts = req.headers.authorization ? req.headers.authorization.split(' ') : ''
  const bearerToken = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : ''
  if (bearerToken) {
    return bearerToken
  }
  // なければ Cookie を使う
  return (req.cookies[authTokenCookieName] as string) || ''
}

export const getSessionFromAuthToken = async (token: string) => {
  const mgr = getManager()
  const payload = jwtSimple.decode(token, jwtKey, false, jwtAlgo)
  const session = await mgr.findOne(SessionEntity, { token: payload.token, userId: payload.userId })

  if (!session) {
    return null
  }

  return {
    id: session.id,
    userId: session.userId,
    token: session.token,
  }
}

export const authMiddleware = wrap(async (req, res, next) => {
  if (
    !/^\/api\/?/.test(req.path) ||
    (req.method.toLowerCase() === 'get' && /^\/api\/(fetch|articles|articles\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.test(req.path)) ||
    (req.method.toLowerCase() === 'post' && /^\/api\/(signup|login|logout)$/.test(req.path))
  ) {
    next()
    return
  }

  const token = getAuthToken(req)
  if (!token) {
    res.sendStatus(403)
    return
  }

  const session = await getSessionFromAuthToken(token)
  if (!session) {
    res.sendStatus(403)
    return
  }

  req.userId = session.userId
  req.token = session.token
  next()
})
