import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ArticleEntity } from '../entities/article'

export const articlesRouter = Router()

articlesRouter.post(
  '/',
  wrap(async (req, res) => {
    const userId: string = req.userId || ''
    const title: string = req.body.title || ''
    const body: string = req.body.body || ''

    if (!title || !body || !userId) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const result = await mgr.save(ArticleEntity, {
      id: uuid(),
      userId,
      title,
      body,
    })

    res.status(201).json(result)
  }),
)

articlesRouter.get(
  '/:id',
  wrap(async (req, res) => {
    const id: string = req.params.id || ''

    if (!id) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const result = await mgr.findOne(ArticleEntity, { id })

    if (!result) {
      res.sendStatus(404)
      return
    }

    res.status(200).json(result)
  }),
)

articlesRouter.delete(
  '/:id',
  wrap(async (req, res) => {
    const id: string = req.params.id || ''
    const userId: string = req.userId || ''

    if (!id || !userId) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const result = await mgr.findOne(ArticleEntity, { id, userId })
    if (!result) {
      res.sendStatus(404)
      return
    }

    await mgr.delete(ArticleEntity, { id, userId })
    res.sendStatus(204)
  }),
)
