import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { UserRepository } from '../protocols/db/login/user-repository';
import { TaskDoesNotExists } from './errors/task-does-not-exists';

interface TaskUpdateDataRequest {
  id: string
  title: string
  description: string
  status: string
}
@Injectable()
export class UpdateTask {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(taskData: TaskUpdateDataRequest) {
    const { id, title, description, status } = taskData;

    const taskFounded = await this.taskRepository.findById(id);
    if (!taskFounded) {
      throw new TaskDoesNotExists();
    }

    taskFounded.title = title;
    taskFounded.description = description;
    taskFounded.status = status;

    const task = await this.taskRepository.updateById(id, taskFounded);
    return { task }
  }
}