import { Injectable } from "@nestjs/common";
import { User } from "src/application/entities/account";
import { UserRepository } from "src/application/protocols/db/login/user-repository";
import { PrismaService } from "../../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<User | null> {
    const task = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return PrismaUserMapper.toDomain(task);
  }
}
