import { UserRepository } from "src/application/protocols/db/login/user-repository";
import { PrismaService } from "./prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { Module } from "@nestjs/common";


@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule { }
