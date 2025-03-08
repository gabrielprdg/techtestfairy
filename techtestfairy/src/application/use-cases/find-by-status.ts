import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';

type FindByStatusResponse = {
  task: Task
}
@Injectable()
export class FindByStatus {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(status: string): Promise<FindByStatusResponse> {
    const task = await this.taskRepository.findByStatus(status);

    if (!task) {
      throw new ConflictException('task with this status does not exists');
    }
    return { task }
  }
}