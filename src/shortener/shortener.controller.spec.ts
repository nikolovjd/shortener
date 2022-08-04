import {Test, TestingModule} from '@nestjs/testing'
import {ShortenerController} from './shortener.controller'
import {ConfigModule} from '@nestjs/config'
import {ShortenerService} from './shortener.service'
import {UrlModule} from '../url/url.module'
import {TypeOrmTestingModule} from '../test-utils/type-orm-testing-module'
import {ShortenUrlDto} from './dto/shorten-url.dto'

describe('ShortenerController', () => {
  let controller: ShortenerController
  let shortenerService: ShortenerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UrlModule, ConfigModule.forRoot({isGlobal: true}), ...TypeOrmTestingModule()],
      providers: [ShortenerService],
      controllers: [ShortenerController],
    }).compile()

    controller = module.get<ShortenerController>(ShortenerController)
    shortenerService = module.get<ShortenerService>(ShortenerService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call shortener service', async () => {
    const result = {url: 'test'}
    const shorten = jest.spyOn(shortenerService, 'shorten').mockImplementation(async () => result)
    await controller.shortenUrl({url: 'test.com'})

    expect(shorten).toHaveBeenCalled()
  })
})
