import { Task } from "src/application/entities/task";

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract updateById(task: Task): Promise<void>;
  abstract loadTasks(task: Task): Promise<void>;
  abstract deleteById(task: Task): Promise<void>;
  abstract findByStatus(status: string): Promise<Task | null>;
}