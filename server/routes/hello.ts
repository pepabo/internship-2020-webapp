import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { BadRequest } from '../utils/errors'

export const helloRouter = Router()

helloRouter.get(
  '/',
  wrap(async (req, res) => {
    const name = (req.query.name as string) || 'world'
    res.json({ hello: name })
  }),
)

helloRouter.post(
  '/',
  wrap(async (req, res) => {
    const name: string = req.body.name || ''
    if (!name) {
      throw new BadRequest()
    }
    res.json({ hello: name })
  }),
)
