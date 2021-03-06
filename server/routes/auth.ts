import { wrap } from '../utils/wrap'
import { v4 as uuid } from 'uuid'
import { UserEntity } from '../entities/user'
import { SessionEntity } from '../entities/session'
import { Router } from 'express'
import { makeSession } from '../utils/session'
import { getManager } from 'typeorm'
import { makeHash, encrypt } from '../utils/crypto'
import { Response } from 'express'
import { sessionExpiration, authTokenCookieName } from '../config/express'
import { ArticleEntity } from '../entities/article'
import { getAuthToken, getSessionFromAuthToken } from '../middlewares/auth'

export const authRouter = Router()

const setToken = async (res: Response, token: string, baseTime = new Date()) => {
  const expires = new Date(baseTime)
  expires.setHours(baseTime.getHours() + sessionExpiration)
  res.cookie(authTokenCookieName, token, {
    httpOnly: true,
    expires,
  })
}

const clearToken = async (res: Response) => {
  res.clearCookie(authTokenCookieName)
}

authRouter.post(
  '/signup',
  wrap(async (req, res) => {
    const email: string = req.body.email || ''
    const password: string = req.body.password || ''
    if (!email || !password) {
      res.sendStatus(400)
      return
    }

    const emailEncrypted = encrypt(email)
    const mgr = getManager()
    const user = await mgr.findOne(UserEntity, { emailEncrypted })
    if (user) {
      res.sendStatus(409)
      return
    }

    const salt = uuid()
    const result = await mgr.save(UserEntity, {
      id: uuid(),
      emailEncrypted,
      salt,
      passwordHash: makeHash(password, salt),
    })
    const token = await makeSession(result.id)

    await setToken(res, token, new Date())

    res.status(201).json({ token })
  }),
)

authRouter.post(
  '/login',
  wrap(async (req, res) => {
    const email: string = req.body.email || ''
    const password: string = req.body.password || ''
    if (!email || !password) {
      res.sendStatus(400)
      return
    }

    const emailEncrypted = encrypt(email)
    const mgr = getManager()
    const user = await mgr.findOne(UserEntity, { emailEncrypted })
    if (!user) {
      res.sendStatus(404)
      return
    }
    if (user.passwordHash !== makeHash(password, user.salt)) {
      res.sendStatus(403)
      return
    }

    const token = await makeSession(user.id)

    await setToken(res, token, new Date())

    res.status(200).json({ token })
  }),
)

authRouter.post(
  '/logout',
  wrap(async (req, res) => {
    const authToken = getAuthToken(req)
    const session = await getSessionFromAuthToken(authToken)

    if (!session) {
      res.sendStatus(200)
      return
    }

    const mgr = getManager()
    await mgr.delete(SessionEntity, { userId: session.userId, token: session.token })

    await clearToken(res)

    res.sendStatus(204)
  }),
)

authRouter.post(
  '/unsubscribe',
  wrap(async (req, res) => {
    if (!req.userId || !req.token) {
      res.status(403)
      return
    }

    const mgr = getManager()
    await mgr.delete(SessionEntity, { userId: req.userId, token: req.token })
    await mgr.delete(ArticleEntity, { userId: req.userId })
    await mgr.delete(UserEntity, { id: req.userId })

    await clearToken(res)

    res.sendStatus(204)
  }),
)
