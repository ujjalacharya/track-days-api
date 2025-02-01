import { PartialType } from '@nestjs/swagger';
import { CreateDaySummaryDto } from './create-day_summary.dto';

export class UpdateDaySummaryDto extends PartialType(CreateDaySummaryDto) {}
