import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ArticleEntity } from '../entities/article'
import { SessionEntity } from '../entities/session'

export const articlesRouter = Router()

articlesRouter.get(
  '/',
  wrap(async (_req, res) => {
    const mgr = getManager()
    const result = await mgr.find(ArticleEntity)
    res.status(200).json(result)
  }),
)

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
    const session = await mgr.findOne(SessionEntity, { userId, token: req.token })

    if (!session) {
      res.sendStatus(403)
      return
    }

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

// 編集する記事を取得
articlesRouter.get(
  '/request/:id',
  wrap(async (req, res) => {
    const id: string = req.params.id || ''
    const userId: string = req.userId || ''

    if (!id || !userId) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const result = await mgr.findOne(ArticleEntity, { id, userId })
    const session = await mgr.findOne(SessionEntity, { userId, token: req.token })

    if (!result) {
      res.sendStatus(404)
      return
    }

    if (!session) {
      res.sendStatus(403)
      return
    }

    res.status(200).json(result)
  }),
)

//記事の内容を上書き
articlesRouter.put(
  '/:id',
  wrap(async (req, res) => {
    const id: string = req.params.id || ''
    const userId: string = req.userId || ''
    const title: string = req.body.title || ''
    const body: string = req.body.body || ''

    if (!id || !title || !body || !userId) {
      res.sendStatus(400)
      return
    }

    const mgr = getManager()
    const article = await mgr.findOne(ArticleEntity, { id, userId })
    const session = await mgr.findOne(SessionEntity, { userId, token: req.token })

    if (!article) {
      res.sendStatus(404)
      return
    }

    if (!session) {
      res.sendStatus(403)
      return
    }

    article.title = title
    article.body = body
    const result = await mgr.save(article)

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
