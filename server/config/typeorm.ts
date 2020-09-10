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
<<<<<<< HEAD
    password: process.env.DB_PASSWORD,
=======
    password: process.env.DB_PASSWORD || '',
>>>>>>> e23f159b29ea259adeac6e54a5797a7d8932c222
    database: process.env.DB_NAME || 'myapp',
    entities: [
      ArticleEntity,
      UserEntity,
      SessionEntity,
    ],
  })
}
