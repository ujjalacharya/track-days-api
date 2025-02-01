import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateDaySummaryDto } from './dto/create-day_summary.dto';
import { UpdateDaySummaryDto } from './dto/update-day_summary.dto';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';

@Injectable()
export class DaySummaryService {
  constructor(
    @Inject('DAY_SUMMARY_REPOSITORY')
    private readonly _repository: Repository<Task>,
  ) {}
  async create(user_id: number, createDaySummaryDto: CreateDaySummaryDto) {
    const daySummary = this._repository.create({
      ...createDaySummaryDto,
      user_id,
    });
    return await this._repository.save(daySummary);
  }

  async findAll(user_id: number) {
    const daySummary = await this._repository.find({
      where: { user_id },
    });
    return daySummary;
  }

  async findOne(user_id: number, id: number) {
    const daySummary = await this._repository.findOneBy({
      id,
      user_id,
    });
    if (!daySummary) {
      throw new HttpException('Day Summary not found', 404);
    }
    return daySummary;
  }

  async update(
    user_id: number,
    id: number,
    updateDaySummaryDto: UpdateDaySummaryDto,
  ) {
    const daySummary = await this._repository.findOneBy({
      id,
      user_id,
    });
    if (!daySummary) {
      throw new HttpException('Day Summary not found', 404);
    }
    Object.assign(daySummary, updateDaySummaryDto);
    return await this._repository.save(daySummary);
  }

  async remove(user_id: number, id: number) {
    const daySummary = await this._repository.findOneBy({
      id,
      user_id,
    });
    if (!daySummary) {
      throw new HttpException('Day Summary not found', 404);
    }
    return await this._repository.remove(daySummary);
  }
}
