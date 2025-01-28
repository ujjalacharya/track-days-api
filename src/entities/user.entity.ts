import { Column, Entity } from 'typeorm';
import Model from './base.entity';

@Entity('users')
export class User extends Model {
  @Column({ nullable: true })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  picture: string;
}
