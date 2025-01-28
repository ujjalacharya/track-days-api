import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.sub, createTaskDto);
  }

  @CommonDecorator({
    model: Task,
    respIsArray: true,
    summary: 'Get all tasks',
  })
  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.sub);
  }

  @CommonDecorator({
    model: Task,
    params: [
      { name: 'id', description: `Task id`, required: true, type: Number },
    ],
    summary: 'Get a Task by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(req.user.sub, +id);
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
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.update(req.user.sub, +id, updateTaskDto);
  }

  @CommonDeleteDecorator({
    model: {},
    params: [
      { name: 'id', description: `Task id`, required: true, type: Number },
    ],
    summary: 'Delete a task',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(req.user.sub, +id);
  }
}
