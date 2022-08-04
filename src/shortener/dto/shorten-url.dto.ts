import {IsUrl} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {Transform} from 'class-transformer'

export class ShortenUrlDto {
  @IsUrl()
  @ApiProperty()
  @Transform(data => {
    const url = data.value
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      return url
    }

    return `http://${url}`
  })
  url: string
}