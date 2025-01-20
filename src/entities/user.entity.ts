import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import Model from './base.entity';

@Entity('users')
export class User extends Model {

    @ApiProperty()
    @Column({ nullable: true })
    username: string;

    @ApiProperty()
    @Column({ nullable: false })
    email: string;

}