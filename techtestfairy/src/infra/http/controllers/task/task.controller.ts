import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AddTask } from 'src/application/use-cases/add-task';
import { AddTaskBody } from '../../dtos/add-task';
import { UpdateTaskBody } from '../../dtos/update-task';
import { FindByStatus } from 'src/application/use-cases/find-by-status';
import { LoadTasks } from 'src/application/use-cases/load-taks';
import { DeleteTask } from 'src/application/use-cases/delete-taks';
import { UpdateTask } from 'src/application/use-cases/update-task';
import { TaskViewModel } from '../../view-model/task-view-model';
import { LoadUsers } from 'src/application/use-cases/load-users';

@Controller('task')
export class TaskController {
  constructor(
    private readonly addTask: AddTask,
    private readonly findByStatus: FindByStatus,
    private readonly loadTask: LoadTasks,
    private readonly deleteTask: DeleteTask,
    private readonly updateTask: UpdateTask,
    private readonly loadUsers: LoadUsers
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

  @Get(':status')
  async findTasksByStatus(@Param('status') status: string) {
    const { tasks } = await this.findByStatus.execute(status)

    return tasks.map(TaskViewModel.toHTTP);
  }

  @Get()
  async loadAll() {
    const { tasks } = await this.loadTask.execute()
    return tasks.map(TaskViewModel.toHTTP);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    await this.deleteTask.execute(id);
  }

  @Patch(':id/update')
  async update(@Param('id') id: string, @Body() body: UpdateTaskBody) {
    const { title, description, status } = body;

    const { task } = await this.updateTask.execute({
      id,
      title,
      description,
      status
    });

    return TaskViewModel.toHTTP(task);
  }

  @Get('users/list')
  async findUsers() {
    const { users } = await this.loadUsers.execute()
    return users.map(TaskViewModel.userToHTTP);
  }
}