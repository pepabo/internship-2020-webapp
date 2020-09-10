import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import jwtSimple from 'jwt-simple'
import { jwtKey, jwtAlgo } from '../config/jwt'
import { SessionEntity } from '../entities/session'

export const authMiddleware = wrap(async (req, res, next) => {
  const mgr = getManager()
  if (/^\/|\/api\/(signup|login|articles\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.test(req.path)) {
    next()
    return
  }
  const parts = req.headers.authorization ? req.headers.authorization.split(' ') : ''
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null
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
