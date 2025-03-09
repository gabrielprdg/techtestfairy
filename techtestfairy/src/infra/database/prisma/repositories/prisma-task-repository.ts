import { Injectable } from "@nestjs/common";
import { Task } from "src/application/entities/task";
import { TaskRepository } from "src/application/protocols/db/task/task-repository";
import { PrismaService } from "../../prisma.service";
import { PrismaTaskMapper } from "../mappers/prisma-task-mapper";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prismaService: PrismaService) { }

  async create(task: Task): Promise<void> {
    const raw = PrismaTaskMapper.toPrisma(task);

    await this.prismaService.task.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return PrismaTaskMapper.toDomain(task);
  }

  async updateById(id: string, task: Task): Promise<Task> {
    const raw = PrismaTaskMapper.toPrisma(task);

    const taskUpdated = await this.prismaService.task.update({
      where: { id: raw.id },
      data: {
        ...raw,
        updatedAt: new Date(),
      },
    });

    return PrismaTaskMapper.toDomain(taskUpdated)
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id },
    });
  }

  async loadTasks(): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany();

    return PrismaTaskMapper.toArrayDomain(tasks);
  }

  async findByStatus(status: string): Promise<Task[] | null> {
    const tasks = await this.prismaService.task.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });

    return PrismaTaskMapper.toArrayDomain(tasks);
  }

}
