import { ConflictException, Injectable } from '@nestjs/common';
import { TaskRepository } from '../protocols/db/task/task-repository';
@Injectable()
export class DeleteTask {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(id: string) {
    const task = await this.taskRepository.findById(id)
    if (!task) {
      throw new ConflictException('task does not exists');
    }


    await this.taskRepository.deleteById(id);
  }
}