import {ApiProperty} from '@nestjs/swagger'

export class ShortenedUrlDto {
  @ApiProperty()
  url: string
}