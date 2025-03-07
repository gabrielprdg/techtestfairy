import { UserRepository } from "src/application/protocols/db/login/user-repository";
import { PrismaService } from "./prisma.service";


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
