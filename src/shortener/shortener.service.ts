import {Injectable, OnModuleDestroy} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import * as crypto from 'crypto'
import * as fs from 'fs'
import BufferBase62 = require('buffer-base62')
import {ScalableBloomFilter} from 'bloom-filters'
import * as path from 'path'
import {UrlService} from '../url/url.service'
import {ShortenedUrlDto} from './dto/shortened-url.dto'

const filterPath = path.join(process.env.PWD, 'bloom_filter.json')

@Injectable()
export class ShortenerService implements OnModuleDestroy {
  private readonly filter = this.initFilter()
  private readonly baseUrl = ''

  constructor(private readonly urlService: UrlService, private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get('BASE_URL')
  }

  async shorten(url: string): Promise<ShortenedUrlDto> {
    const id = await this.generateId()
    await this.urlService.store(id, url)
    return {url: `${this.baseUrl}/${id}`}
  }

  getFilter() {
    return this.filter.saveAsJSON()
  }

  onModuleDestroy() {
    fs.writeFileSync(filterPath, JSON.stringify(this.filter.saveAsJSON()))
  }

  private async generateId(): Promise<string> {
    while (true) {
      const id = BufferBase62.toBase62(await crypto.randomBytes(5))
      if (!this.filter.has(id)) {
        this.filter.add(id)
        return id
      }
    }
  }

  private initFilter(): ScalableBloomFilter {
    if (fs.existsSync(filterPath)) {
      try {
        return ScalableBloomFilter.fromJSON(require(filterPath))
      } catch (err) {
        console.error()
      }
    }

    return new ScalableBloomFilter(10000, 0.01)
  }
}
