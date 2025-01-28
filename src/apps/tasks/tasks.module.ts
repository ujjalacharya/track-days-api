import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { taskProviders } from './tasks.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService, JwtService],
})
export class TasksModule {}
