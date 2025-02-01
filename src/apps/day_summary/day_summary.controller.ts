import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DaySummaryService } from './day_summary.service';
import { CreateDaySummaryDto } from './dto/create-day_summary.dto';
import { UpdateDaySummaryDto } from './dto/update-day_summary.dto';
import { RequestOverride } from 'src/abstracts/overrides';
import { AuthGuardJWT } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuardJWT)
@ApiBearerAuth('JWT-auth')
@Controller('day_summary')
export class DaySummaryController {
  constructor(private readonly daySummaryService: DaySummaryService) {}

  @Post()
  create(
    @Req() req: RequestOverride,
    @Body() createDaySummaryDto: CreateDaySummaryDto,
  ) {
    const user_id = req.user.sub;
    return this.daySummaryService.create(user_id, createDaySummaryDto);
  }

  @Get()
  findAll(@Req() req: RequestOverride) {
    const user_id = req.user.sub;
    return this.daySummaryService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestOverride) {
    const user_id = req.user.sub;
    return this.daySummaryService.findOne(user_id, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDaySummaryDto: UpdateDaySummaryDto,
    @Req() req: RequestOverride,
  ) {
    const user_id = req.user.sub;
    return this.daySummaryService.update(user_id, +id, updateDaySummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestOverride) {
    const user_id = req.user.sub;
    return this.daySummaryService.remove(user_id, +id);
  }
}
