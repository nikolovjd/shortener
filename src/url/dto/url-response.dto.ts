import {IsUrl} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {Exclude} from 'class-transformer'

@Exclude()
export class UrlResponseDto {
  @IsUrl()
  @ApiProperty()
  url: string
}