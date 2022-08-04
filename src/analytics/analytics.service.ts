import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository, EntityManager} from 'typeorm'
import {PageView} from './entities/page-view.entity'
import {ShortenedUrl} from '../url/entities/shortened-url.entity'

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PageView) private readonly pageViewRepository: Repository<PageView>,
  ) {
  }

  async create(url: ShortenedUrl, transaction: EntityManager) {
    const view = transaction.create(PageView, {url})
    await transaction.save(view)
  }

  async addPageView(url: ShortenedUrl) {
    await this.pageViewRepository.increment({urlId: url.id}, 'views', 1)
  }
}
