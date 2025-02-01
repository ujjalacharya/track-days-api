import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './apps/tasks/tasks.module';
import { PerformedTasksModule } from './apps/performed_tasks/performed_tasks.module';
import { UsersModule } from './apps/users/users.module';
import { AuthModule } from './apps/auth/auth.module';
import { validate } from './config/config.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DaySummaryModule } from './apps/day_summary/day_summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    TasksModule,
    PerformedTasksModule,
    UsersModule,
    AuthModule,
    DaySummaryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
