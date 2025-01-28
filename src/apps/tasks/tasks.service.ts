import { Injectable, HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly _repository: Repository<Task>,
  ) {}

  async create(user_id: number, createTaskDto: CreateTaskDto) {
    const task = this._repository.create({
      ...createTaskDto,
      user_id,
    });
    return await this._repository.save(task);
  }

  async findAll(user_id: number) {
    const tasks = await this._repository.find({
      where: { user_id },
    });
    return tasks;
  }

  async findOne(user_id: number, id: number) {
    const task = await this._repository.findOneBy({
      id,
      user_id,
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    return task;
  }

  async update(user_id: number, id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this._repository.findOneBy({
      id,
      user_id,
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    Object.assign(task, updateTaskDto);
    return await this._repository.save(task);
  }

  async remove(user_id: number, id: number) {
    const task = await this._repository.findOneBy({ id, user_id });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    await this._repository.remove(task);
    return { message: `Task with id ${id} has been removed` };
  }
}
