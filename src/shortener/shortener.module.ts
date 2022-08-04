import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import {UrlModule} from '../url/url.module'

@Module({
  providers: [ShortenerService],
  controllers: [ShortenerController],
  imports: [UrlModule]
})
export class ShortenerModule {}
