import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import {TypeOrmTestingModule} from '../test-utils/type-orm-testing-module'
import {AnalyticsModule} from '../analytics/analytics.module'

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), AnalyticsModule],
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
