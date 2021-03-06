import { createConnection } from 'typeorm'
import { ArticleEntity } from '../entities/article'
import { UserEntity } from '../entities/user'
import { SessionEntity } from '../entities/session'

export const initTypeOrm = async () => {
  await createConnection({
    synchronize: true,
    type: 'mysql' as const,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USER || 'myapp',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'myapp',
    entities: [
      ArticleEntity,
      UserEntity,
      SessionEntity,
    ],
  })
}
