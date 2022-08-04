import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Redirect,
  UseInterceptors
} from '@nestjs/common'
import {UrlService} from './url.service'
import {ConfigService} from '@nestjs/config'
import {AnalyticsService} from '../analytics/analytics.service'
import {UrlResponseDto} from './dto/url-response.dto'

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService, configService: ConfigService, private readonly analyticsService: AnalyticsService) {
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.find(id)
    if (!url) {
      throw new NotFoundException()
    }

    this.analyticsService.addPageView(url) // no await for performance

    return {
      url: url.url,
      statusCode: 302
    }
  }

  @Get('/url/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUrl(@Param('id') id: string): Promise<UrlResponseDto> {
    const url = await this.urlService.find(id)
    if (!url) {
      throw new NotFoundException()
    }

    this.analyticsService.addPageView(url) // no await for performance

    return {
      url: url.url,
    }
  }
}
