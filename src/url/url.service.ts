import {Injectable, Logger} from '@nestjs/common'
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm'
import {ShortenedUrl} from './entities/shortened-url.entity'
import {Repository, EntityManager} from 'typeorm'
import {AnalyticsService} from '../analytics/analytics.service'

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name)

  constructor(
    @InjectRepository(ShortenedUrl) private readonly urlRepository: Repository<ShortenedUrl>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly analyticsService: AnalyticsService
  ) {
  }

  async store(id, url) {
    try {
      const transaction = this.entityManager.transaction(async transaction => {
        const entry = transaction.create(ShortenedUrl, {id, url})
        await entry.save()
        await this.analyticsService.create(entry, transaction)
      })
    } catch (err) {
      this.logger.error(`Could not store ID: ${id} URL: ${url}`)
      this.logger.error(err)
      throw err
    }
  }

  async find(id) {
    return this.urlRepository.findOne({where: {id}})
  }
}
