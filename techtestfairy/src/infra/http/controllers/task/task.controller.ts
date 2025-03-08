import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AddTask } from 'src/application/use-cases/add-task';
import { AddTaskBody } from '../../dtos/add-task';

@Controller('task')
export class AuthController {
  constructor(
    private readonly addTask: AddTask,
    private readonly findByStatus: findByStatus,
    private readonly loadTask: LoadTask,
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

  async findTaskByStatus(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  async loadAll(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  async delete(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  async update(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }
}