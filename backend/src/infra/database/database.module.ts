import { UserRepository } from "src/application/protocols/db/login/user-repository";
import { PrismaService } from "./prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { Module } from "@nestjs/common";
import { TaskRepository } from "src/application/protocols/db/task/task-repository";
import { PrismaTaskRepository } from "./prisma/repositories/prisma-task-repository";
import { LoadUsers } from "src/application/use-cases/load-users";


@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    }
  ],
  exports: [UserRepository, TaskRepository],
})
export class DatabaseModule { }
