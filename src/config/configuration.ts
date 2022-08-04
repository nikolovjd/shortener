import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as dotenv from 'dotenv'

// Entities
import {ShortenedUrl} from '../url/entities/shortened-url.entity'

dotenv.config()

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL,
  database
});

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [ShortenedUrl],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  autoLoadEntities: true,
  synchronize: true
}
