import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDaySummaryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Summary is required' })
  summary: string;
}
