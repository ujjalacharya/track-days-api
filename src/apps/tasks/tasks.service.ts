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
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = this._repository.create(createTaskDto);
    return await this._repository.save(task);
  }

  async findAll() {
    const tasks = await this._repository.find();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this._repository.findOneBy({
      id,
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this._repository.findOneBy({
      id,
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    Object.assign(task, updateTaskDto);
    return await this._repository.save(task);
  }

  async remove(id: number) {
    const task = await this._repository.findOneBy({ id });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    await this._repository.remove(task);
    return { message: `Task with id ${id} has been removed` };
  }
}