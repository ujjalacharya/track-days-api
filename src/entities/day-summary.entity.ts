import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { User } from './user.entity';

@Entity('day_summaries')
export class DaySummary extends Model {
  @ApiProperty()
  @Column({ nullable: false, type: 'longtext' })
  summary: string;

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
