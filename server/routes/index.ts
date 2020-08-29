import { Router } from 'express'
import { helloRouter } from './hello'

export const apiRouter = Router()

apiRouter.use('/hello', helloRouter)
