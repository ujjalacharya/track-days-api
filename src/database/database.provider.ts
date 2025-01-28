import { ConfigService } from '@nestjs/config';
import { connectionSource } from './typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async () => {
      return connectionSource.initialize();
    },
  },
];
