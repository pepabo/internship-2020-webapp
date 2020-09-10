import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import jwtSimple from 'jwt-simple'
import { jwtKey, jwtAlgo } from '../config/jwt'
import { SessionEntity } from '../entities/session'
import { authTokenCookieName } from '../config/express'

export const authMiddleware = wrap(async (req, res, next) => {
  const mgr = getManager()
  if (
    !/^\/api\/?/.test(req.path) ||
    (req.method.toLowerCase() === 'get' && /^\/api\/(fetch|articles|articles\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.test(req.path)) ||
    (req.method.toLowerCase() === 'post' && /^\/api\/(signup|login|logout)$/.test(req.path))
  ) {
    next()
    return
  }

  const token: string = (() => {
    // Authorization Header からトークンを取り出す
    const parts = req.headers.authorization ? req.headers.authorization.split(' ') : ''
    const bearerToken = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null
    if (bearerToken) {
      return bearerToken
    }
    // なければ Cookie を使う
    return req.cookies[authTokenCookieName] || ''
  })()

  if (!token) {
    res.sendStatus(403)
    return
  }

  const payload = jwtSimple.decode(token, jwtKey, false, jwtAlgo)
  const session = await mgr.findOne(SessionEntity, { token: payload.token, userId: payload.userId })
  if (!session) {
    res.sendStatus(403)
    return
  }

  req.userId = payload.userId
  req.token = payload.token
  next()
})
