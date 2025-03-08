import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';

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

    if (!tasks) {
      throw new ConflictException('task with this status does not exists');
    }
    return { tasks }
  }
}