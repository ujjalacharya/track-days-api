import { Module } from '@nestjs/common';
import { DaySummaryService } from './day_summary.service';
import { DaySummaryController } from './day_summary.controller';
import { daySummaryProviders } from './day_summary.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [DaySummaryController],
  providers: [DaySummaryService, ...daySummaryProviders, JwtService],
})
export class DaySummaryModule {}
