import {Body, Controller, Get, Post} from '@nestjs/common'
import {ShortenerService} from './shortener.service'
import {ShortenUrlDto} from './dto/shorten-url.dto'
import {ApiCreatedResponse} from '@nestjs/swagger'
import {ShortenedUrlDto} from './dto/shortened-url.dto'

@Controller('shortener')
export class ShortenerController {
  constructor(private shortenerService: ShortenerService) {
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ShortenedUrlDto,
  })
  async shortenUrl(@Body() shortenUrlDto: ShortenUrlDto) {
    return this.shortenerService.shorten(shortenUrlDto.url)
  }
}
