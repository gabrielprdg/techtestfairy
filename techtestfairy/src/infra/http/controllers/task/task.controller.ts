import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AddTask } from 'src/application/use-cases/add-task';
import { AddTaskBody } from '../../dtos/add-task';
import { UpdateTaskBody } from '../../dtos/update-task';
import { FindByStatus } from 'src/application/use-cases/find-by-status';
import { LoadTasks } from 'src/application/use-cases/load-taks';
import { DeleteTask } from 'src/application/use-cases/delete-taks';
import { UpdateTask } from 'src/application/use-cases/update-task';

@Controller('task')
export class TaskController {
  constructor(
    private readonly addTask: AddTask,
    private readonly findByStatus: FindByStatus,
    private readonly loadTask: LoadTasks,
    private readonly deleteTask: DeleteTask,
    private readonly updateTask: UpdateTask,
  ) { }

  @Post()
  @HttpCode(204)
  async create(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  @Get('tasks/:status')
  async findTaskByStatus(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  @Get('tasks')
  async loadAll(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    await this.deleteTask.execute(id);
  }

  @Patch(':id/update')
  async update(@Param('id') id: string, @Body() body: UpdateTaskBody) {
    const { title, description, status } = body;

    const task = await this.updateTask.execute({
      id,
      title,
      description,
      status
    });

    return { task };
  }
}