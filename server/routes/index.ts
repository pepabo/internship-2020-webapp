import { Router } from 'express'
import { authRouter } from './auth'
import { helloRouter } from './hello'
import { articlesRouter } from './articles'

export const apiRouter = Router()

apiRouter.use('/', authRouter)
apiRouter.use('/hello', helloRouter)
apiRouter.use('/articles', articlesRouter)
