import { User } from 'src/application/entities/account';
import { Task } from 'src/application/entities/task';

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt
    };
  }

  static userToHTTP(user: User) {
    return {
      id: user.id,
      name: user.name
    };
  }
}
