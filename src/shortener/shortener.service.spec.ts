import {Test, TestingModule} from '@nestjs/testing'
import {ShortenerService} from './shortener.service'
import {TypeOrmTestingModule} from '../test-utils/type-orm-testing-module'
import {UrlModule} from '../url/url.module'
import {ConfigModule, ConfigService} from '@nestjs/config'

jest.useFakeTimers()

describe('ShortenerService', () => {
  let service: ShortenerService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), UrlModule, ConfigModule.forRoot({isGlobal: true})],
      providers: [ShortenerService],
    }).compile()

    service = module.get<ShortenerService>(ShortenerService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should have bloomFilter initialized', () => {
    const filter = service.getFilter()
    expect(filter.type).toBe('ScalableBloomFilter')
  })
})
