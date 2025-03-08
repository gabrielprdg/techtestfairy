import { User } from "src/application/entities/account";

export abstract class TaskRepository {
  abstract create(user: User): Promise<void>;
  abstract updateById(user: User): Promise<void>;
  abstract loadTasks(user: User): Promise<void>;
  abstract deleteById(user: User): Promise<void>;
  abstract findByStatus(email: string): Promise<User | null>;
}