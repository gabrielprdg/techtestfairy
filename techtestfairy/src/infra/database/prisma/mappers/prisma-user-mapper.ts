import { User as RawUser } from '@prisma/client'
import { User } from 'src/application/entities/account'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        hashedPassword: raw.password,
        createdAt: raw.createdAt
      },
      raw.id
    )
  }
}