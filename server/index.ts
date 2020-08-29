import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import { apiRouter } from './routes'
import { errorHandler } from './middlewares/error'

void (async () => {
  const dev = process.env.NODE_ENV !== 'production'

  const app = next({ dev })
  const handle = app.getRequestHandler()
  await app.prepare()

  const server = express()
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : dev ? 3000 : 80

  server.use(bodyParser.json())
  server.use('/api', apiRouter)
  server.use(errorHandler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => console.debug(`Ready on http://localhost:${port}`))
})().catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
