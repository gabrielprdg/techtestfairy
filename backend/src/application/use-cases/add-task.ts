import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';
import { UserRepository } from '../protocols/db/login/user-repository';

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
      throw new ConflictException('User does not exists');
    }

    const task = new Task({
      title,
      description,
      userId
    })

    await this.taskRepository.create(task);
  }
}