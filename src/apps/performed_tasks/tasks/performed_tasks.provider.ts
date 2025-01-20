import { PerformedTask } from 'src/entities/performed-tasks.entity';
import { Task } from 'src/entities/tasks.entity';
import { DataSource } from 'typeorm';

export const performedTaskProviders = [
    {
        provide: 'PERFORMED_TASK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PerformedTask),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TASK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ['DATA_SOURCE'],
    },
];
