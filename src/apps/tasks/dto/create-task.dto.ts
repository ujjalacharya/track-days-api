import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;
}
