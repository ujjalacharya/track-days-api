import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends Model {

    @ApiProperty()
    @Column({ nullable: false })
    title: string;

    @ApiProperty()
    @Column({ nullable: false })
    user_id: number;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

}