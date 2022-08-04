import { TypeOrmModule } from '@nestjs/typeorm';
import {ShortenedUrl} from '../url/entities/shortened-url.entity'
import {PageView} from '../analytics/entities/page-view.entity'

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [ShortenedUrl, PageView],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([ShortenedUrl, PageView]),
];