import { PartialType } from '@nestjs/swagger';
import { CreatePerformedTaskDto } from './create-performed_task.dto';

export class UpdatePerformedTaskDto extends PartialType(CreatePerformedTaskDto) {}
