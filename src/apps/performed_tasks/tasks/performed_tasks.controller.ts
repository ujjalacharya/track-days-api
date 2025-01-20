import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BodyCommonDecorator, CommonDecorator, CommonDeleteDecorator } from 'src/abstracts/common.decorator';
import { Task } from 'src/entities/tasks.entity';
import { CreatePerformedTaskDto } from './dto/create-performed_task.dto';
import { UpdatePerformedTaskDto } from './dto/update-performed_task.dto';
import { PerformedTask } from 'src/entities/performed-tasks.entity';
import { PerformedTaskService } from './performed_tasks.service';

@Controller('performed_tasks')
export class PerformedTasksController {
  constructor(private readonly performedTasksService: PerformedTaskService) {}

  @BodyCommonDecorator({
    dto: CreatePerformedTaskDto,
    method: 'post',
    model: PerformedTask,
    summary: 'Create new performed task',
})
  @Post()
  create(@Body() createTaskDto: CreatePerformedTaskDto) {
    return this.performedTasksService.create(createTaskDto);
  }

  @CommonDecorator({
    model: PerformedTask,
    respIsArray: true,
    summary: 'Get all performed tasks',
})
  @Get()
  findAll() {
    return this.performedTasksService.findAll();
  }

  @CommonDecorator({
    model: Task,
    params: [{ name: 'id', description: `Task id`, required: true, type: Number }],
    summary: 'Get a Task by id',
})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performedTasksService.findOne(+id);
  }

  @BodyCommonDecorator({
    dto: UpdatePerformedTaskDto,
    model: Task,
    params: [{ name: 'id', description: `Task id`, required: true, type: Number }],
    method: 'patch',
    summary: 'Update a task by id',
})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformedTaskDto: UpdatePerformedTaskDto) {
    return this.performedTasksService.update(+id, updatePerformedTaskDto);
  }

  @CommonDeleteDecorator({
    model: {},
    params: [{ name: 'id', description: `Task id`, required: true, type: Number }],
    summary: 'Delete a task',
})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performedTasksService.remove(+id);
  }
}
