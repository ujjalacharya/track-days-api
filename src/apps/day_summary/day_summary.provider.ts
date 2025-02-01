import { DaySummary } from 'src/entities/day-summary.entity';
import { DataSource } from 'typeorm';

export const daySummaryProviders = [
  {
    provide: 'DAY_SUMMARY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DaySummary),
    inject: ['DATA_SOURCE'],
  },
];
