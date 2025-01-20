import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { Task } from './tasks.entity';
import { User } from './user.entity';

export enum Status {
    AllDone = 'AllDone',
    AlmostDone = 'AlmostDone',
    HalfDone = 'HalfDone',
}

@Entity('performed_tasks')
export class PerformedTask extends Model {

    @ApiProperty()
    @Column({ nullable: false })
    date: Date;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Status,
        default: Status.HalfDone,
    })
    status: Status;

    @ApiProperty()
    @Column({ nullable: false })
    user_id: number;

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'user_id' }])
    user: User;

    @ApiProperty({ type: [Task] })
    @ManyToMany(() => Task, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({
        name: 'tasks_and_performed_tasks',
        joinColumn: {
            name: 'performed_task_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'task_id',
            referencedColumnName: 'id',
        },
    })
    tasks: Task[];

}
