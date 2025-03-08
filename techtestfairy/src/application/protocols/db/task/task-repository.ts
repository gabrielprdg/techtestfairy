import { Task } from "src/application/entities/task";

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract updateById(id: string): Promise<void>;
  abstract loadTasks(): Promise<Task[] | null>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findByStatus(status: string): Promise<Task | null>;
}