import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  BodyCommonDecorator,
  CommonDecorator,
  CommonDeleteDecorator,
} from 'src/abstracts/common.decorator';
import { Task } from 'src/entities/tasks.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuardJWT } from '../auth/auth.guard';

@UseGuards(AuthGuardJWT)
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @BodyCommonDecorator({
    dto: CreateTaskDto,
    method: 'post',
    model: Task,
    summary: 'Create new task',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @CommonDecorator({
    model: Task,
    respIsArray: true,
    summary: 'Get all tasks',
  })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @CommonDecorator({
    model: Task,
    params: [
      { name: 'id', description: `Task id`, required: true, type: Number },
    ],
    summary: 'Get a Task by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @BodyCommonDecorator({
    dto: UpdateTaskDto,
    model: Task,
    params: [
      { name: 'id', description: `Task id`, required: true, type: Number },
    ],
    method: 'patch',
    summary: 'Update a task by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @CommonDeleteDecorator({
    model: {},
    params: [
      { name: 'id', description: `Task id`, required: true, type: Number },
    ],
    summary: 'Delete a task',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
