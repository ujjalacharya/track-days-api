import { Task } from 'src/entities/tasks.entity';
import { DataSource } from 'typeorm';

export const taskProviders = [
    {
        provide: 'TASK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ['DATA_SOURCE'],
    },
];
