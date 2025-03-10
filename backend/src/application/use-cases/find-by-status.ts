import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { StatusDoesNotExists } from './errors/status-does-not-exists';

type FindByStatusResponse = {
  tasks: Task[]
}
@Injectable()
export class FindByStatus {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(status: string): Promise<FindByStatusResponse> {
    const tasks = await this.taskRepository.findByStatus(status);

    if (!tasks || tasks.length === 0) {
      throw new StatusDoesNotExists();
    }
    return { tasks }
  }
}