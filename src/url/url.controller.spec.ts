import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import {UrlService} from './url.service'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {AnalyticsModule} from '../analytics/analytics.module'
import {UrlModule} from './url.module'
import {ShortenerModule} from '../shortener/shortener.module'
import {TypeOrmTestingModule} from '../test-utils/type-orm-testing-module'

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UrlModule, ConfigModule.forRoot({isGlobal: true}), AnalyticsModule, ...TypeOrmTestingModule()],
      controllers: [UrlController],
      providers: [UrlService]
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
