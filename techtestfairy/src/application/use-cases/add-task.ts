import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../protocols/db/login/user-repository';
import { AuthService } from 'src/infra/services/auth.service';
import { HashService } from 'src/infra/services/hash.service';
import { Task } from '../entities/task';
import { TaskRepository } from '../protocols/db/task/task-repository';

interface TaskDataRequest {
  title: string
  description: string
  userId: string
}
@Injectable()
export class AddTask {
  constructor(
    private readonly taskRepository: TaskRepository
  ) { }

  async execute(taskData: TaskDataRequest) {
    const { title, description, userId } = taskData

    const user = await this.taskRepository.findById(userId)
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