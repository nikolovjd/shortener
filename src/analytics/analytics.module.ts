import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {PageView} from './entities/page-view.entity'

@Module({
  providers: [AnalyticsService],
  imports: [TypeOrmModule.forFeature([PageView])],
  exports: [AnalyticsService]
})
export class AnalyticsModule {}
