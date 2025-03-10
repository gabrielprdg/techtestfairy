import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { UserRepository } from '../protocols/db/login/user-repository';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { UserDoesNotExists } from './errors/user-does-not-exists';

interface TaskDataRequest {
  title: string
  description: string
  userId: string
}
@Injectable()
export class AddTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute(taskData: TaskDataRequest) {
    const { title, description, userId } = taskData

    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UserDoesNotExists();
    }

    const task = new Task({
      title,
      description,
      userId
    })

    await this.taskRepository.create(task);
  }
}