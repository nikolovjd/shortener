import {Module} from '@nestjs/common'
import {UrlService} from './url.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ShortenedUrl} from './entities/shortened-url.entity'
import { UrlController } from './url.controller';
import {AnalyticsModule} from '../analytics/analytics.module'

@Module({
  providers: [UrlService],
  imports: [TypeOrmModule.forFeature([ShortenedUrl]), AnalyticsModule],
  exports: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {
}
