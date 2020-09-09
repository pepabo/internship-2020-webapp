import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ArticleEntity } from '../entities/article'

export const articlesRouter = Router()

articlesRouter.post(
  '/',
  wrap(async (req, res) => {
    const title: string = req.body.title || ''
    const body: string = req.body.body || ''

    if (!title || !body) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const result = await mgr.save(ArticleEntity, {
      id: uuid(),
      userId: uuid(),
      title,
      body,
    })

    res.status(201).json(result)
  }),
)
