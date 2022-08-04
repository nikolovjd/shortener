import {Test, TestingModule} from '@nestjs/testing'
import {AnalyticsService} from './analytics.service'
import {TypeOrmTestingModule} from '../test-utils/type-orm-testing-module'

describe('AnalyticsService', () => {
  let service: AnalyticsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [AnalyticsService],
    }).compile()

    service = module.get<AnalyticsService>(AnalyticsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
