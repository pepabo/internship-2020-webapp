import { Router } from 'express'
import { helloRouter } from './hello'
import { articlesRouter } from './articles'

export const apiRouter = Router()

apiRouter.use('/hello', helloRouter)
apiRouter.use('/articles', articlesRouter)
