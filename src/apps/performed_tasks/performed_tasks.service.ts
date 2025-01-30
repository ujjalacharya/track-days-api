import { HttpException, Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PerformedTask } from 'src/entities/performed-tasks.entity';
import { CreatePerformedTaskDto } from './dto/create-performed_task.dto';
import { UpdatePerformedTaskDto } from './dto/update-performed_task.dto';
import { Task } from 'src/entities/tasks.entity';

@Injectable()
export class PerformedTaskService {
  constructor(
    @Inject('PERFORMED_TASK_REPOSITORY')
    private _repository: Repository<PerformedTask>,
    @Inject('TASK_REPOSITORY')
    private _taskRepository: Repository<Task>,
  ) {}

  async create(createPerformedTaskDto: CreatePerformedTaskDto) {
    const { tasks, ...otherFields } = createPerformedTaskDto;

    const tasksFromDb = await this._taskRepository.findBy({
      id: In(tasks),
    });

    if (tasks.length !== tasksFromDb.length) {
      throw new HttpException('Some tasks not found', 404);
    }

    const performedTaskForSameDayExists = await this._repository
      .createQueryBuilder('performed_tasks')
      .where('DATE(performed_tasks.date) = DATE(:inputDate)', {
        inputDate: createPerformedTaskDto.date,
      })
      .leftJoinAndSelect('performed_tasks.tasks', 'tasks')
      .getOne();

    if (performedTaskForSameDayExists) {
      if (performedTaskForSameDayExists?.tasks?.length === 0) {
        await this._repository.remove(performedTaskForSameDayExists);
      } else {
        throw new HttpException(
          'Performed task for the same day already exists',
          400,
        );
      }
    }

    const performedTask = this._repository.create();
    performedTask.tasks = tasksFromDb;

    Object.assign(performedTask, otherFields);

    return await this._repository.save(performedTask);
  }

  async findAll(user_id: number) {
    const performedTasks = await this._repository.find({
      where: { user_id },
    });
    return performedTasks;
  }

  async findOne(user_id: number, id: number) {
    const performedTask = await this._repository.findOne({
      where: { id, user_id },
      relations: ['tasks'],
    });

    if (!performedTask) {
      throw new HttpException('Performed task not found', 404);
    }

    return performedTask;
  }

  async update(
    user_id: number,
    id: number,
    updatePerformedTaskDto: UpdatePerformedTaskDto,
  ) {
    const { tasks, ...otherFields } = updatePerformedTaskDto;

    const performedTask = await this._repository.findOneBy({ id });

    if (!performedTask) {
      throw new HttpException('Performed task not found', 404);
    }

    const tasksFromDb = await this._taskRepository.findBy({
      id: In(tasks),
      user_id,
    });

    if (tasksFromDb.length !== tasks.length) {
      throw new HttpException('Some tasks not found', 404);
    }

    performedTask.tasks = tasksFromDb;
    Object.assign(performedTask, otherFields);

    return await this._repository.save(performedTask);
  }

  async remove(user_id: number, id: number) {
    const performedTask = await this._repository.findOneBy({ id, user_id });

    if (!performedTask) {
      throw new HttpException('Performed task not found', 404);
    }

    return await this._repository.remove(performedTask);
  }
}
