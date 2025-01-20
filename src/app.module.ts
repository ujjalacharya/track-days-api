import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './apps/tasks/tasks.module';
import { PerformedTasksModule } from './apps/performed_tasks/tasks/performed_tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TasksModule,
    PerformedTasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
