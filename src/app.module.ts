import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './apps/tasks/tasks.module';
import { PerformedTasksModule } from './apps/performed_tasks/tasks/performed_tasks.module';
import { UsersModule } from './apps/users/users.module';
import { AuthModule } from './apps/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    TasksModule,
    PerformedTasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
