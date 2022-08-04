import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ShortenerModule} from './shortener/shortener.module'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {UrlModule} from './url/url.module'
import { AnalyticsModule } from './analytics/analytics.module';
import configuration from './config/configuration'

@Module({
  imports: [ConfigModule.forRoot({
    ignoreEnvFile: true,
    load: [configuration],
    cache: true,
    isGlobal: true
  }), ShortenerModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return configService.get('database')
    },
    inject: [ConfigService],
  }), UrlModule, AnalyticsModule],
})
export class AppModule {
}
