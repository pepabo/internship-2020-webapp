import { v4 as uuid } from 'uuid'
import jwtSimple from 'jwt-simple'
import { getManager, LessThan } from 'typeorm'
import { jwtKey, jwtAlgo } from '../config/jwt'
import { SessionEntity } from '../entities/session'

const revokeOldSession = async (userId: string, exp: number) => {
  const threshold = new Date()
  threshold.setHours(threshold.getHours() - exp)
  const mgr = getManager()
  await mgr.delete(SessionEntity, { userId, createdAt: LessThan(threshold) })
}

export const makeSession = async (userId: string): Promise<string> => {
  const exp = 12
  const mgr = getManager()
  const result = await mgr.save(SessionEntity, {
    id: uuid(),
    userId,
    token: uuid(),
  })

  await revokeOldSession(userId, exp)

  const unixNow = new Date().getTime() / 1000
  return jwtSimple.encode(
    {
      sub: uuid(),
      iat: Math.floor(unixNow),
      exp: Math.floor(unixNow + exp * 60 * 60),
      userId,
      token: result.token,
    },
    jwtKey,
    jwtAlgo,
  )
}
