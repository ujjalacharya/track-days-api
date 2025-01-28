import { Module } from '@nestjs/common';
import { PerformedTasksController } from './performed_tasks.controller';
import { performedTaskProviders } from './performed_tasks.provider';
import { DatabaseModule } from 'src/database/database.module';
import { PerformedTaskService } from './performed_tasks.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [PerformedTasksController],
  providers: [...performedTaskProviders, PerformedTaskService, JwtService],
})
export class PerformedTasksModule {}
