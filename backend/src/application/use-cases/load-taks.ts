import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../protocols/db/task/task-repository";
import { Task } from "../entities/task";

type GetTaskResponse = {
  tasks: Task[];
};

@Injectable()
export class LoadTasks {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async execute(): Promise<GetTaskResponse> {
    const tasks = await this.taskRepository.loadTasks();

    return {
      tasks
    };
  }
}
