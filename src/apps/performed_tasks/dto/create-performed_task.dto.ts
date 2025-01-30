import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from 'src/entities/performed-tasks.entity';

export class CreatePerformedTaskDto {
  @ApiProperty({ enum: Status })
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @IsOptional()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tasks is required' })
  tasks: number[];
}
