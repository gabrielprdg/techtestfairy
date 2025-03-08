import { Task as RawTask } from '@prisma/client'
import { Task } from 'src/application/entities/task'

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt
    }
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: raw.title,
        description: raw.description,
        status: raw.status,
        userId: raw.userId,
        createdAt: raw.createdAt
      },
      raw.id
    )
  }

  static toArrayDomain(raw: RawTask[]): Task[] {
    const tasks = raw.map(
      (task) =>
        new Task(
          {
            title: task.title,
            description: task.description,
            userId: task.userId,
            status: task.status,
            createdAt: task.createdAt,
          },
          task.id,
        ),
    );

    return tasks;
  }
}