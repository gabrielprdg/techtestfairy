import { ConflictException, Injectable } from '@nestjs/common';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { TaskDoesNotExists } from './errors/task-does-not-exists';
@Injectable()
export class DeleteTask {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(id: string) {
    const task = await this.taskRepository.findById(id)
    if (!task) {
      throw new TaskDoesNotExists();
    }


    await this.taskRepository.deleteById(id);
  }
}