import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { TaskDoesNotExists } from './errors/task-does-not-exists';

type FindByIdResponse = {
  task: Task
}
@Injectable()
export class FindById {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(id: string): Promise<FindByIdResponse> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskDoesNotExists();
    }
    return { task }
  }
}