import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';

@Injectable()
export class TasksService {

  constructor(
    @Inject('TASK_REPOSITORY')
    private _repository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {

    const contentProvider = this._repository.create({
      ...createTaskDto
    });

    return await this._repository.save(contentProvider);
  }

  async findAll() {
    const tasks = await this._repository.find();
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
